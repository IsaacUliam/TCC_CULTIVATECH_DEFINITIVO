import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { AuthContext } from '../contexts/AuthContext';

export function LoginScreen() {
  const { signIn } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Atenção', 'Preencha todos os campos.');
      return;
    }

    try {
      setSubmitting(true);
      await signIn(email, password);
    } catch (error: any) {
      // 1. O servidor respondeu com status de erro (ex: 400, 401, 404, 500)
      if (error.response) {
        const status = error.response.status;
        const message = error.response.data?.message || 'Credenciais inválidas ou erro no servidor.';
        Alert.alert(`Erro API (${status})`, message);
      } 
      // 2. A requisição foi enviada, mas NÃO recebeu resposta (Problema de Rede / CORS / URL)
      else if (error.request) {
        Alert.alert(
          'Erro de Conexão (Rede)',
          'Não foi possível conectar ao servidor.\n\nVerifique se:\n1. A porta 3333 no Codespaces está como PUBLIC.\n2. A URL em src/services/api.ts começa com https://.'
        );
      } 
      // 3. Erro interno ao montar a requisição
      else {
        Alert.alert('Erro Inesperado', error.message || 'Ocorreu um erro ao processar a requisição.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>🌱 CultivaTech</Text>
      <Text style={styles.welcome}>Bem-vindo ao seu sistema de cultivo inteligente</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor="#999"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity 
          style={[styles.button, submitting && styles.buttonDisabled]} 
          onPress={handleLogin}
          disabled={submitting}
        >
          {submitting ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Entrar</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f6f8', justifyContent: 'center', padding: 24 },
  logo: { fontSize: 32, fontWeight: 'bold', color: '#1b5e20', textAlign: 'center' },
  welcome: { fontSize: 14, color: '#666', textAlign: 'center', marginBottom: 32, marginTop: 8 },
  form: { backgroundColor: '#fff', padding: 20, borderRadius: 16, elevation: 3 },
  input: { backgroundColor: '#f0f2f5', height: 50, borderRadius: 10, paddingHorizontal: 16, marginBottom: 16, color: '#333' },
  button: { backgroundColor: '#2e7d32', height: 50, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginTop: 8 },
  buttonDisabled: { backgroundColor: '#a5d6a7' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});