#include <SoftwareSerial.h>
#include <OneWire.h>
#include <DallasTemperature.h>
#include <EEPROM.h> // Incluída biblioteca EEPROM

// ... [Manter definições de pinos existentes] ...

char deviceCode[16] = "HORTA-001"; // Variável em memória para o código dinâmico

void setup() {
  Serial.begin(9600);
  bluetooth.begin(9600);
  sensorTemp.begin();

  pinMode(PINO_RELE, OUTPUT);
  digitalWrite(PINO_RELE, LOW);

  // Lê o código salvo na EEPROM (se já tiver sido configurado)
  carregarCodigoEEPROM();

  Serial.print("Dispositivo Inicializado. Código: ");
  Serial.println(deviceCode);
}

void processarComandosBluetooth() {
  if (bluetooth.available()) {
    String comando = bluetooth.readStringUntil('\n');
    comando.trim();

    // Comando para ligar/desligar bomba
    if (comando == "WATER_ON" || comando == "LIGAR") {
      bombaLigada = true;
      digitalWrite(PINO_RELE, HIGH);
      bluetooth.println("{\"ack\":\"WATER_ON\",\"status\":\"SUCCESS\"}");
    } 
    else if (comando == "WATER_OFF" || comando == "DESLIGAR") {
      bombaLigada = false;
      digitalWrite(PINO_RELE, LOW);
      bluetooth.println("{\"ack\":\"WATER_OFF\",\"status\":\"SUCCESS\"}");
    }
    // NOVO: Comando para alterar o identificador da horta via aplicativo
    // Exemplo enviado pelo App: "SET_CODE:HORTA-002" ou "SET_CODE:ESTUFA-TOMATE"
    else if (comando.startsWith("SET_CODE:")) {
      String novoCodigo = comando.substring(9);
      novoCodigo.trim();
      
      if (novoCodigo.length() > 0 && novoCodigo.length() < 15) {
        novoCodigo.toCharArray(deviceCode, 16);
        salvarCodigoEEPROM(deviceCode);
        
        bluetooth.print("{\"ack\":\"SET_CODE\",\"new_code\":\"");
        bluetooth.print(deviceCode);
        bluetooth.println("\",\"status\":\"SUCCESS\"}");
      }
    }
  }
}

// Funções auxiliares para gravação/leitura na EEPROM
void salvarCodigoEEPROM(const char* codigo) {
  for (int i = 0; i < 15; i++) {
    EEPROM.write(i, codigo[i]);
    if (codigo[i] == '\0') break;
  }
}

void carregarCodigoEEPROM() {
  // Se o primeiro byte não for válido/limpo (255), lê da EEPROM
  if (EEPROM.read(0) != 255 && EEPROM.read(0) != 0) {
    for (int i = 0; i < 15; i++) {
      deviceCode[i] = EEPROM.read(i);
      if (deviceCode[i] == '\0') break;
    }
  }
}