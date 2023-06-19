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

import { MantineTheme } from "@mantine/core";
import { Link } from "react-router-dom";
import { useMutation } from "react-query";
import { API_URL } from "./context/constants";
import { LoginContext } from "./context/LoginContext";

export function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // @ts-ignore
  const { setIsLoggedIn } = useContext(LoginContext);
  const { isLoading, mutate } = useMutation(
    () =>
      fetch(`${API_URL}/signup`, {
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
          window.location.href = "/";
        }
      },
    }
  );

  const handleSubmit = () => {
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
        Already have an account?{" "}
        <Link to="/">
          <Anchor size="sm" component="button">
            Login
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
        {error && <Text color="red">{error}</Text>}
        <Button fullWidth mt="xl" onClick={handleSubmit} loading={isLoading}>
          Sign Up
        </Button>
      </Paper>
    </Container>
  );
}
