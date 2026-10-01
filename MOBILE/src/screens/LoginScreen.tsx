import React, { useContext, useRef, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { AuthContext } from "../contexts/AuthContext";

type AuthMode = "login" | "register";

function getAuthError(error: any, mode: AuthMode) {
  const status = error?.response?.status;
  const serverMessage = error?.response?.data?.message;

  if (mode === "login" && (status === 401 || status === 403)) {
    return "E-mail ou senha incorretos. Confira seus dados e tente novamente.";
  }
  if (mode === "register" && status === 409) {
    return "Este e-mail já está cadastrado. Tente entrar na sua conta.";
  }
  if (!error?.response) {
    return "Não foi possível conectar. Verifique sua internet e tente novamente.";
  }
  if (typeof serverMessage === "string" && serverMessage.trim()) {
    return serverMessage;
  }
  return mode === "register"
    ? "Não foi possível criar sua conta agora. Tente novamente em instantes."
    : "Não foi possível entrar agora. Tente novamente em instantes.";
}

export function LoginScreen() {
  const { signIn, signUp } = useContext(AuthContext);
  const nameInputRef = useRef<TextInput>(null);
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const confirmPasswordInputRef = useRef<TextInput>(null);
  const [mode, setMode] = useState<AuthMode>("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  function changeMode(nextMode: AuthMode) {
    setMode(nextMode);
    setErrorMessage("");
    setShowPassword(false);
    setShowConfirmPassword(false);
  }

  async function handleSubmit() {
    const normalizedName = name.trim();
    const normalizedEmail = email.trim().toLowerCase();

    if (mode === "register" && !normalizedName) {
      setErrorMessage("Informe seu nome para criar a conta.");
      nameInputRef.current?.focus();
      return;
    }
    if (!normalizedEmail || !password.trim()) {
      setErrorMessage("Informe seu e-mail e sua senha para continuar.");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(normalizedEmail)) {
      setErrorMessage("Digite um endereço de e-mail válido.");
      return;
    }
    if (mode === "register" && password !== confirmPassword) {
      setErrorMessage("As senhas não conferem. Verifique e tente novamente.");
      confirmPasswordInputRef.current?.focus();
      return;
    }

    setErrorMessage("");
    setIsLoading(true);
    try {
      if (mode === "register") {
        await signUp(normalizedName, normalizedEmail, password);
      } else {
        await signIn(normalizedEmail, password);
      }
      // O AuthContext atualiza user; Routes exibe a área autenticada automaticamente.
    } catch (error) {
      setErrorMessage(getAuthError(error, mode));
    } finally {
      setIsLoading(false);
    }
  }

  const isRegistering = mode === "register";

  return (
    <View style={styles.page}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F8F3" />
      <View pointerEvents="none" style={styles.decorations}>
        <View style={styles.decorCircleLarge} />
        <View style={styles.decorCircleSmall} />
      </View>

      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.brandRow}>
            <View style={styles.brandIcon}>
              <MaterialCommunityIcons name="sprout" size={26} color="#FFFFFF" />
            </View>
            <View>
              <Text style={styles.brandName}>Cultiva Tech</Text>
              <Text style={styles.brandCaption}>HORTA INTELIGENTE</Text>
            </View>
          </View>

          <View style={styles.intro}>
            <Text style={styles.welcome}>
              {isRegistering ? "Cultive algo novo" : "Bem-vindo de volta"}
            </Text>
            <Text style={styles.introText}>
              {isRegistering
                ? "Crie sua conta para acompanhar sua horta com mais cuidado e tecnologia."
                : "Entre para acompanhar sua horta e cuidar do que está crescendo."}
            </Text>
          </View>

          <View style={styles.formCard}>
            <View style={styles.tabs}>
              <TouchableOpacity
                style={[styles.tab, !isRegistering && styles.tabActive]}
                onPress={() => changeMode("login")}
                disabled={isLoading}
                accessibilityRole="tab"
                accessibilityState={{ selected: !isRegistering }}
              >
                <Text
                  style={[
                    styles.tabText,
                    !isRegistering && styles.tabTextActive,
                  ]}
                >
                  Entrar
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.tab, isRegistering && styles.tabActive]}
                onPress={() => changeMode("register")}
                disabled={isLoading}
                accessibilityRole="tab"
                accessibilityState={{ selected: isRegistering }}
              >
                <Text
                  style={[
                    styles.tabText,
                    isRegistering && styles.tabTextActive,
                  ]}
                >
                  Criar conta
                </Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.formTitle}>
              {isRegistering ? "Crie sua conta" : "Entrar na sua conta"}
            </Text>
            <Text style={styles.formSubtitle}>
              {isRegistering
                ? "Preencha os dados para começar."
                : "Use o e-mail e a senha cadastrados."}
            </Text>

            {isRegistering && (
              <View style={styles.fieldGroup}>
                <Text style={styles.label}>Nome</Text>
                <View style={styles.inputShell}>
                  <Feather name="user" size={17} color="#718579" />
                  <TextInput
                    ref={nameInputRef}
                    value={name}
                    onChangeText={(value) => {
                      setName(value);
                      if (errorMessage) setErrorMessage("");
                    }}
                    placeholder="Como devemos chamar você?"
                    placeholderTextColor="#9AA69D"
                    style={styles.input}
                    autoCapitalize="words"
                    autoCorrect={false}
                    textContentType="name"
                    returnKeyType="next"
                    onSubmitEditing={() => emailInputRef.current?.focus()}
                    accessibilityLabel="Nome"
                  />
                </View>
              </View>
            )}

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>E-mail</Text>
              <View style={styles.inputShell}>
                <Feather name="mail" size={17} color="#718579" />
                <TextInput
                  ref={emailInputRef}
                  value={email}
                  onChangeText={(value) => {
                    setEmail(value);
                    if (errorMessage) setErrorMessage("");
                  }}
                  placeholder="seuemail@exemplo.com"
                  placeholderTextColor="#9AA69D"
                  style={styles.input}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  textContentType="emailAddress"
                  returnKeyType="next"
                  onSubmitEditing={() => passwordInputRef.current?.focus()}
                  accessibilityLabel="E-mail"
                />
              </View>
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Senha</Text>
              <View style={styles.inputShell}>
                <Feather name="lock" size={17} color="#718579" />
                <TextInput
                  ref={passwordInputRef}
                  value={password}
                  onChangeText={(value) => {
                    setPassword(value);
                    if (errorMessage) setErrorMessage("");
                  }}
                  placeholder={
                    isRegistering ? "Crie uma senha" : "Digite sua senha"
                  }
                  placeholderTextColor="#9AA69D"
                  style={styles.input}
                  secureTextEntry={!showPassword}
                  textContentType={isRegistering ? "newPassword" : "password"}
                  autoCapitalize="none"
                  returnKeyType={isRegistering ? "next" : "go"}
                  onSubmitEditing={() =>
                    isRegistering
                      ? confirmPasswordInputRef.current?.focus()
                      : handleSubmit()
                  }
                  accessibilityLabel="Senha"
                />
                <TouchableOpacity
                  onPress={() => setShowPassword((visible) => !visible)}
                  style={styles.passwordToggle}
                  accessibilityRole="button"
                  accessibilityLabel={
                    showPassword ? "Ocultar senha" : "Mostrar senha"
                  }
                >
                  <Feather
                    name={showPassword ? "eye-off" : "eye"}
                    size={18}
                    color="#718579"
                  />
                </TouchableOpacity>
              </View>
            </View>

            {isRegistering && (
              <View style={styles.fieldGroup}>
                <Text style={styles.label}>Confirmar senha</Text>
                <View style={styles.inputShell}>
                  <Feather name="check-circle" size={17} color="#718579" />
                  <TextInput
                    ref={confirmPasswordInputRef}
                    value={confirmPassword}
                    onChangeText={(value) => {
                      setConfirmPassword(value);
                      if (errorMessage) setErrorMessage("");
                    }}
                    placeholder="Digite a senha novamente"
                    placeholderTextColor="#9AA69D"
                    style={styles.input}
                    secureTextEntry={!showConfirmPassword}
                    textContentType="newPassword"
                    autoCapitalize="none"
                    returnKeyType="go"
                    onSubmitEditing={handleSubmit}
                    accessibilityLabel="Confirmar senha"
                  />
                  <TouchableOpacity
                    onPress={() =>
                      setShowConfirmPassword((visible) => !visible)
                    }
                    style={styles.passwordToggle}
                    accessibilityRole="button"
                    accessibilityLabel={
                      showConfirmPassword
                        ? "Ocultar confirmação da senha"
                        : "Mostrar confirmação da senha"
                    }
                  >
                    <Feather
                      name={showConfirmPassword ? "eye-off" : "eye"}
                      size={18}
                      color="#718579"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            )}

            {!!errorMessage && (
              <View style={styles.errorBox} accessibilityRole="alert">
                <Feather name="alert-circle" size={17} color="#B94C48" />
                <Text style={styles.errorText}>{errorMessage}</Text>
              </View>
            )}

            <TouchableOpacity
              style={[
                styles.submitButton,
                isLoading && styles.submitButtonLoading,
              ]}
              onPress={handleSubmit}
              disabled={isLoading}
              accessibilityRole="button"
              accessibilityLabel={isRegistering ? "Criar conta" : "Entrar"}
            >
              {isLoading ? (
                <>
                  <ActivityIndicator size="small" color="#FFFFFF" />
                  <Text style={styles.submitButtonText}>
                    {isRegistering ? "Criando conta..." : "Entrando..."}
                  </Text>
                </>
              ) : (
                <>
                  <Text style={styles.submitButtonText}>
                    {isRegistering ? "Criar conta" : "Entrar"}
                  </Text>
                  <Feather name="arrow-right" size={18} color="#FFFFFF" />
                </>
              )}
            </TouchableOpacity>

            <View style={styles.secureNote}>
              <Feather name="shield" size={14} color="#72927B" />
              <Text style={styles.secureNoteText}>
                {isRegistering
                  ? "Seus dados ficam protegidos e vinculados à sua conta."
                  : "Seus dados são usados para acessar sua conta com segurança."}
              </Text>
            </View>
          </View>

          <View style={styles.footer}>
            <View style={styles.footerLeaf}>
              <MaterialCommunityIcons name="leaf" size={16} color="#6C9A72" />
            </View>
            <Text style={styles.footerText}>
              Cultive com cuidado. Acompanhe com tecnologia.
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#F5F8F3",
    flex: 1,
  },
  decorations: {
    ...StyleSheet.absoluteFillObject,
    overflow: "hidden",
  },
  decorCircleLarge: {
    backgroundColor: "#E8F2E7",
    borderRadius: 180,
    height: 360,
    position: "absolute",
    right: -175,
    top: -145,
    width: 360,
  },
  decorCircleSmall: {
    backgroundColor: "#EDF4EB",
    borderRadius: 90,
    height: 180,
    left: -110,
    position: "absolute",
    top: 300,
    width: 180,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  brandRow: {
    alignItems: "center",
    alignSelf: "center",
    flexDirection: "row",
    marginBottom: 26,
  },
  brandIcon: {
    alignItems: "center",
    backgroundColor: "#1F6B43",
    borderRadius: 17,
    elevation: 4,
    height: 52,
    justifyContent: "center",
    marginRight: 12,
    shadowColor: "#174B31",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    width: 52,
  },
  brandName: {
    color: "#1D442E",
    fontSize: 21,
    fontWeight: "800",
    letterSpacing: -0.5,
  },
  brandCaption: {
    color: "#7C907F",
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 1.5,
    marginTop: 3,
  },
  intro: {
    alignItems: "center",
    marginBottom: 20,
  },
  welcome: {
    color: "#183B2A",
    fontSize: 28,
    fontWeight: "800",
    letterSpacing: -0.8,
    textAlign: "center",
  },
  introText: {
    color: "#718176",
    fontSize: 13,
    lineHeight: 20,
    marginTop: 8,
    maxWidth: 310,
    textAlign: "center",
  },
  formCard: {
    backgroundColor: "#FFFFFF",
    borderColor: "#E4EBE4",
    borderRadius: 26,
    borderWidth: 1,
    elevation: 7,
    padding: 22,
    shadowColor: "#1F4C31",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 18,
  },
  tabs: {
    backgroundColor: "#F0F4F0",
    borderRadius: 13,
    flexDirection: "row",
    marginBottom: 20,
    padding: 4,
  },
  tab: {
    alignItems: "center",
    borderRadius: 10,
    flex: 1,
    justifyContent: "center",
    minHeight: 40,
  },
  tabActive: {
    backgroundColor: "#FFFFFF",
    elevation: 2,
    shadowColor: "#234A31",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  tabText: {
    color: "#718176",
    fontSize: 12,
    fontWeight: "700",
  },
  tabTextActive: {
    color: "#1F6B43",
    fontWeight: "800",
  },
  formTitle: {
    color: "#1D382A",
    fontSize: 19,
    fontWeight: "800",
    letterSpacing: -0.3,
  },
  formSubtitle: {
    color: "#839087",
    fontSize: 12,
    marginTop: 5,
  },
  fieldGroup: {
    marginTop: 17,
  },
  label: {
    color: "#375641",
    fontSize: 12,
    fontWeight: "700",
    marginBottom: 7,
  },
  inputShell: {
    alignItems: "center",
    backgroundColor: "#F8FAF8",
    borderColor: "#E1E9E2",
    borderRadius: 14,
    borderWidth: 1,
    flexDirection: "row",
    minHeight: 50,
    paddingHorizontal: 13,
  },
  input: {
    color: "#1D382A",
    flex: 1,
    fontSize: 13,
    minHeight: 48,
    paddingHorizontal: 10,
    paddingVertical: 0,
  },
  passwordToggle: {
    alignItems: "center",
    height: 40,
    justifyContent: "center",
    width: 34,
  },
  errorBox: {
    alignItems: "flex-start",
    backgroundColor: "#FFF2F0",
    borderColor: "#F2D8D4",
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: "row",
    gap: 8,
    marginTop: 15,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  errorText: {
    color: "#9B3F3B",
    flex: 1,
    fontSize: 11,
    lineHeight: 16,
  },
  submitButton: {
    alignItems: "center",
    backgroundColor: "#1F6B43",
    borderRadius: 15,
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 21,
    minHeight: 52,
    paddingHorizontal: 18,
  },
  submitButtonLoading: {
    backgroundColor: "#39865B",
    gap: 9,
  },
  submitButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "800",
  },
  secureNote: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 15,
  },
  secureNoteText: {
    color: "#87958A",
    flex: 1,
    fontSize: 10,
    marginLeft: 6,
  },
  footer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 22,
  },
  footerLeaf: {
    marginRight: 6,
  },
  footerText: {
    color: "#819083",
    fontSize: 10,
    fontWeight: "600",
  },
});
