import { useState, ChangeEvent, useContext } from "react";
import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
} from "@mantine/core";
import { useMutation, useQuery } from "react-query";

import { MantineTheme } from "@mantine/core";
import { Link } from "react-router-dom";
import { API_URL } from "./context/constants";
import { LoginContext } from "./context/LoginContext";

export function AuthenticationForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  // @ts-ignore
  const { setIsLoggedIn } = useContext(LoginContext);
  const { isLoading, mutate } = useMutation(
    () =>
      fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      }),
    {
      onSuccess: async (data) => {
        const d = await data.body?.getReader().read();
        const res = JSON.parse(new TextDecoder("utf-8").decode(d?.value));
        if (res.error) {
          setError(res.error);
        } else {
          setIsLoggedIn(true);
        }
      },
    }
  );

  const handleLogin = () => {
    mutate();
  };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.currentTarget.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.currentTarget.value);
  };

  return (
    <Container size={420} my={40}>
      <Title
        align="center"
        sx={(theme: MantineTheme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        Welcome back!
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Do not have an account yet?{" "}
        <Link to="/signup">
          <Anchor size="sm" component="button">
            Create account
          </Anchor>
        </Link>
      </Text>

      <Paper
        withBorder
        shadow="md"
        p={30}
        mt={30}
        radius="md"
        className="login-form"
      >
        <TextInput
          label="Email"
          placeholder="you@mantine.dev"
          required
          value={email}
          onChange={handleEmailChange}
          style={{ textAlign: "left" }}
        />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          required
          mt="md"
          value={password}
          onChange={handlePasswordChange}
          style={{ textAlign: "left" }}
        />
        {/* @ts-ignore */}
        {error && <Text color="red">{error}</Text>}
        <Group position="apart" mt="lg">
          <Checkbox label="Remember me" />
          <Anchor component="button" size="sm">
            Forgot password?
          </Anchor>
        </Group>
        <Button fullWidth mt="xl" onClick={handleLogin} loading={isLoading}>
          Sign in
        </Button>
      </Paper>
    </Container>
  );
}
