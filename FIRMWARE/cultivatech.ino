#include <SoftwareSerial.h>
#include <OneWire.h>
#include <DallasTemperature.h>

// ==========================================
// PINAGEM E CONFIGURAÇÃO DE HARDWARE
// ==========================================
#define PINO_DS18B20 2        // Pino de dados do DS18B20 (com resistor pull-up 4.7k)
#define PINO_UMIDADE_SOLO A0  // Pino analógico do sensor de umidade
#define PINO_RELE 8           // Pino digital de controle do relé (Bomba)

#define HC05_RX 10            // Conecta no TX do módulo Bluetooth
#define HC05_TX 11            // Conecta no RX do módulo Bluetooth (usar divisor de tensão 5V->3.3V)

// ==========================================
// INSTÂNCIA DOS OBJETOS
// ==========================================
OneWire oneWire(PINO_DS18B20);
DallasTemperature sensorTemp(&oneWire);
SoftwareSerial bluetooth(HC05_RX, HC05_TX);

// Código identificador único desta estufa/horta
const char* DEVICE_CODE = "HORTA-001";

// ==========================================
// VARIÁVEIS DE CONTROLE
// ==========================================
bool bombaLigada = false;
unsigned long ultimoEnvio = 0;
const unsigned long intervaloEnvio = 3000; // Envia dados a cada 3 segundos (3000 ms)

// Valores simulados/fixos (pH e Salinidade para validação)
float phSimulado = 6.5;
float salinidadeSimulada = 1.2;

// ==========================================
// SETUP
// ==========================================
void setup() {
  Serial.begin(9600);      // Monitor Serial da IDE
  bluetooth.begin(9600);   // Comunicação com o módulo HC-05

  sensorTemp.begin();

  pinMode(PINO_RELE, OUTPUT);
  digitalWrite(PINO_RELE, LOW); // Inicia com a bomba desligada

  Serial.println("==========================================");
  Serial.println("   CultivaTech - Firmware Inicializado   ");
  Serial.println("==========================================");
}

// ==========================================
// LOOP PRINCIPAL
// ==========================================
void loop() {
  // 1. Processa comandos recebidos do aplicativo via Bluetooth
  processarComandosBluetooth();

  // 2. Transmite leituras dos sensores periodicamente (sem bloquear a execução)
  if (millis() - ultimoEnvio >= intervaloEnvio) {
    ultimoEnvio = millis();
    enviarTelemetria();
  }
}

// ==========================================
// PROCESSAR COMANDOS VIA BLUETOOTH
// ==========================================
void processarComandosBluetooth() {
  if (bluetooth.available()) {
    String comando = bluetooth.readStringUntil('\n');
    comando.trim(); // Remove espaços em branco e caracteres de quebra de linha

    if (comando == "WATER_ON" || comando == "LIGAR") {
      bombaLigada = true;
      digitalWrite(PINO_RELE, HIGH);
      bluetooth.println("{\"ack\":\"WATER_ON\",\"status\":\"SUCCESS\"}");
      Serial.println("[BLUETOOTH] Comando Recebido: Ligar Bomba");
    } 
    else if (comando == "WATER_OFF" || comando == "DESLIGAR") {
      bombaLigada = false;
      digitalWrite(PINO_RELE, LOW);
      bluetooth.println("{\"ack\":\"WATER_OFF\",\"status\":\"SUCCESS\"}");
      Serial.println("[BLUETOOTH] Comando Recebido: Desligar Bomba");
    }
  }
}

// ==========================================
// LEITURA DA UMIDADE DO SOLO
// ==========================================
float lerUmidadeSolo() {
  int valorBruto = analogRead(PINO_UMIDADE_SOLO);
  
  // Calibração padrão: Mapeia leitura analógica (1023=Seco, 200=Molhado) para (0% a 100%)
  // Obs: Ajuste os valores 1023 e 200 de acordo com as leituras reais do seu sensor no solo seco/água
  float umidadePercentual = map(valorBruto, 1023, 200, 0, 100);
  return constrain(umidadePercentual, 0.0, 100.0);
}

// ==========================================
// TRANSMISSÃO DE TELEMETRIA (JSON)
// ==========================================
void enviarTelemetria() {
  sensorTemp.requestTemperatures();
  float temperaturaC = sensorTemp.getTempCByIndex(0);
  float umidadeSolo = lerUmidadeSolo();

  // Validação de segurança caso o sensor de temperatura esteja desconectado
  if (temperaturaC == DEVICE_DISCONNECTED_C) {
    temperaturaC = 25.0; // Valor de fallback para não quebrar a aplicação
  }

  // Monta e envia o pacote JSON padronizado via Bluetooth em uma única linha
  bluetooth.print("{\"device_code\":\"");
  bluetooth.print(DEVICE_CODE);
  bluetooth.print("\",\"humidity\":");
  bluetooth.print(umidadeSolo, 1);
  bluetooth.print(",\"ph\":");
  bluetooth.print(phSimulado, 1);
  bluetooth.print(",\"salinity\":");
  bluetooth.print(salinidadeSimulada, 1);
  bluetooth.print(",\"temp\":");
  bluetooth.print(temperaturaC, 1);
  bluetooth.print(",\"pump\":");
  bluetooth.print(bombaLigada ? 1 : 0);
  bluetooth.println("}");

  // Espelho das leituras para depuração no Monitor Serial da IDE
  Serial.print("[TELEMETRIA] Temp: ");
  Serial.print(temperaturaC);
  Serial.print(" °C | Umidade Solo: ");
  Serial.print(umidadeSolo);
  Serial.print("% | Bomba: ");
  Serial.println(bombaLigada ? "LIGADA" : "DESLIGADA");
}