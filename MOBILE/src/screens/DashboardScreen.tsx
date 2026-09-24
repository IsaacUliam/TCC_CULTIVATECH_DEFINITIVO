import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert, ScrollView } from 'react-native';
import { api } from '../services/api';

interface DashboardData {
  crop: {
    id: number;
    nickname: string;
    device_code: string;
    last_watered_at: string | null;
  };
  plant: {
    name: string;
    care_tips: string;
    ideals: {
      humidity: number;
      ph: [number, number];
      salinity: [number, number];
    };
  };
  latest_reading: {
    humidity_value: number;
    ph_value: number;
    salinity_value: number;
  } | null;
  health_analysis: {
    status: string;
    messages: string[];
  };
}

export function DashboardScreen({ route }: any) {
  const cropId = route?.params?.cropId || 1; // ID do cultivo selecionado
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [watering, setWatering] = useState(false);

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/crops/${cropId}/dashboard`);
      setData(response.data);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os dados do cultivo.');
    } finally {
      setLoading(false);
    }
  };

  const handleWaterCrop = async () => {
    try {
      setWatering(true);
      // 1. Registra a irrigação no backend Node.js
      await api.patch(`/crops/${cropId}/water`);
      
      // 2. Atualiza os dados da tela
      await fetchDashboard();
      Alert.alert('Sucesso', 'Irrigação iniciada e registrada!');
    } catch (error) {
      Alert.alert('Erro', 'Falha ao registrar irrigação no servidor.');
    } finally {
      setWatering(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, [cropId]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2e7d32" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <Text style={styles.title}>{data?.crop.nickname}</Text>
        <Text style={styles.subtitle}>Planta: {data?.plant.name} ({data?.crop.device_code})</Text>
      </View>

      {/* Cards de Sensores */}
      <View style={styles.cardsRow}>
        <View style={styles.card}>
          <Text style={styles.cardLabel}>Umidade</Text>
          <Text style={styles.cardValue}>{data?.latest_reading?.humidity_value ?? '--'}%</Text>
          <Text style={styles.cardIdeal}>Ideal: {data?.plant.ideals.humidity}%</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardLabel}>pH do Solo</Text>
          <Text style={styles.cardValue}>{data?.latest_reading?.ph_value ?? '--'}</Text>
          <Text style={styles.cardIdeal}>
            Ideal: {data?.plant.ideals.ph[0]} - {data?.plant.ideals.ph[1]}
          </Text>
        </View>
      </View>

      {/* Status da Saúde */}
      <View style={styles.healthBox}>
        <Text style={styles.healthTitle}>Status de Saúde: {data?.health_analysis.status}</Text>
        {data?.health_analysis.messages.map((msg, index) => (
          <Text key={index} style={styles.healthMessage}>• {msg}</Text>
        ))}
      </View>

      {/* Botão de Irrigar */}
      <TouchableOpacity 
        style={[styles.waterButton, watering && styles.disabledButton]} 
        onPress={handleWaterCrop}
        disabled={watering}
      >
        <Text style={styles.waterButtonText}>
          {watering ? 'Acionando Irrigação...' : '💧 Irrigar Agora'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f6f8', padding: 16 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { marginBottom: 20, marginTop: 40 },
  title: { fontSize: 26, fontWeight: 'bold', color: '#1b5e20' },
  subtitle: { fontSize: 14, color: '#555' },
  cardsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  card: { flex: 1, backgroundColor: '#fff', padding: 16, borderRadius: 12, marginHorizontal: 4, elevation: 2 },
  cardLabel: { fontSize: 12, color: '#777' },
  cardValue: { fontSize: 24, fontWeight: 'bold', color: '#2e7d32', marginVertical: 8 },
  cardIdeal: { fontSize: 10, color: '#999' },
  healthBox: { backgroundColor: '#e8f5e9', padding: 16, borderRadius: 12, marginBottom: 20 },
  healthTitle: { fontSize: 16, fontWeight: 'bold', color: '#2e7d32', marginBottom: 6 },
  healthMessage: { fontSize: 13, color: '#333' },
  waterButton: { backgroundColor: '#0288d1', padding: 16, borderRadius: 12, alignItems: 'center' },
  disabledButton: { backgroundColor: '#b0bec5' },
  waterButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});