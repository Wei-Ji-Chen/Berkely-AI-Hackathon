import React from "react";
import { Dots } from "./Dots";
import {
  Card,
  Image,
  Text,
  Badge,
  Button,
  Group,
  createStyles,
  Title,
  Container,
  rem,
} from "@mantine/core";
// import { createStyles, Title, Text, Button, Container, rem } from '@mantine/core';
import "./journal_style.css";

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: "relative",
    paddingTop: rem(120),
    paddingBottom: rem(80),

    [theme.fn.smallerThan("sm")]: {
      paddingTop: rem(80),
      paddingBottom: rem(60),
    },
  },

  inner: {
    position: "relative",
    zIndex: 1,
  },

  dots: {
    position: "absolute",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[5]
        : theme.colors.gray[1],

    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  dotsLeft: {
    left: 0,
    top: 0,
  },

  title: {
    textAlign: "center",
    fontWeight: 800,
    fontSize: rem(40),
    letterSpacing: -1,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    marginBottom: theme.spacing.xs,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,

    [theme.fn.smallerThan("xs")]: {
      fontSize: rem(28),
      textAlign: "left",
    },
  },

  highlight: {
    color:
      theme.colors[theme.primaryColor][theme.colorScheme === "dark" ? 4 : 6],
  },

  description: {
    textAlign: "center",

    [theme.fn.smallerThan("xs")]: {
      textAlign: "left",
      fontSize: theme.fontSizes.md,
    },
  },

  controls: {
    marginTop: theme.spacing.lg,
    display: "flex",
    justifyContent: "center",

    [theme.fn.smallerThan("xs")]: {
      flexDirection: "column",
    },
  },

  control: {
    "&:not(:first-of-type)": {
      marginLeft: theme.spacing.md,
    },

    [theme.fn.smallerThan("xs")]: {
      height: rem(42),
      fontSize: theme.fontSizes.md,

      "&:not(:first-of-type)": {
        marginTop: theme.spacing.md,
        marginLeft: 0,
      },
    },
  },
}));

const Journal: React.FC = () => {
  const { classes } = useStyles();
  return (
    <div className="journal-container">
      {/* <header className="journal-header">
        <h1>Keep a Journal</h1>
      </header> */}
      <Container className={classes.wrapper} size={1400}>
        <Dots className={classes.dots} style={{ left: 0, top: 0 }} />
        <Dots className={classes.dots} style={{ left: 60, top: 0 }} />
        <Dots className={classes.dots} style={{ left: 0, top: 140 }} />
        <Dots className={classes.dots} style={{ right: 0, top: 60 }} />

        <div className={classes.inner}>
          <Title className={classes.title}>
            Automated AI{" "}
            <Text component="span" className={classes.highlight} inherit>
              Journal reviews
            </Text>{" "}
            for any conversation
          </Title>

          <Container p={0} size={600}>
            <Text size="lg" color="dimmed" className={classes.description}>
              Keep a journal to express thoughts and feelings, gain clarity, and
              self-reflect
            </Text>
          </Container>

          <div className={classes.controls}>
            <Button
              className={classes.control}
              size="lg"
              variant="default"
              color="gray"
            >
              Start Writing
            </Button>
            <Button className={classes.control} size="lg">
              Journal Intro
            </Button>
          </div>
        </div>
      </Container>

      <main className="journal-main">
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Card.Section
            component="a"
            href="https://google.com"
            target="_blank"
            rel="noreferrer"
          >
            <Image
              src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
              height={160}
              alt="Norway"
            />
          </Card.Section>
          <Group position="apart" mt="md" mb="xs">
            <Text weight={500}>Express Your Thoughts and Feelings</Text>
            <Badge color="pink" variant="light">
              Exclusive
            </Badge>
          </Group>
          <Text size="sm" color="dimmed">
            Keeping a journal allows you to freely express your thoughts and
            feelings. Write about your experiences, emotions, and reflections
            without any judgment or limitations.
          </Text>
        </Card>

        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Card.Section
            component="a"
            href="https://google.com"
            target="_blank"
            rel="noreferrer"
          >
            <Image
              src="https://images.unsplash.com/photo-1682686581264-c47e25e61d95?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
              height={160}
              alt="Norway"
            />
          </Card.Section>
          <Group position="apart" mt="md" mb="xs">
            <Text weight={500}>Gain Clarity</Text>
            <Badge color="pink" variant="light">
              Exclusive
            </Badge>
          </Group>
          <Text size="sm" color="dimmed">
            Writing in a journal can help you gain clarity about your thoughts
            and situations. It allows you to explore your ideas, analyze your
            experiences, and make sense of your emotions.
          </Text>
        </Card>
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Card.Section
            component="a"
            href="https://google.com"
            target="_blank"
            rel="noreferrer"
          >
            <Image
              src="https://images.unsplash.com/photo-1686644472123-6f5430d2206f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxM3x8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
              height={160}
              alt="Norway"
            />
          </Card.Section>
          <Group position="apart" mt="md" mb="xs">
            <Text weight={500}>Self-Reflect</Text>
            <Badge color="pink" variant="light">
              Exclusive
            </Badge>
          </Group>
          <Text size="sm" color="dimmed">
            Journaling is a powerful tool for self-reflection. It helps you
            become more self-aware, understand your patterns and behaviors, and
            foster personal growth and development.
          </Text>
        </Card>
      </main>
    </div>
  );
};

export default Journal;
