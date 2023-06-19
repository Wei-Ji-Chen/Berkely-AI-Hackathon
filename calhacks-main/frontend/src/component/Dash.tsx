import React from "react";
import {
  createStyles,
  Badge,
  Group,
  Title,
  Text,
  Card,
  SimpleGrid,
  Container,
  rem,
  Flex,
} from "@mantine/core";
import { Ballpen, Checkbox, Notebook } from "tabler-icons-react";
import { StatsRing } from "./ring";
import { StatsCard } from "./card";
import { useViewportSize } from "@mantine/hooks";
const mockdata = [
  {
    title: "Journals",
    description:
      "Keep a journal to express thoughts and feelings, gain clarity, and self-reflect",
    icon: <Ballpen size={24} color="currentColor" />,
  },
  {
    title: "Habits",
    description:
      "Track healthy habits to practice coping skills in managing stress, anxiety, or difficulty emotions",
    icon: <Checkbox size={24} color="currentColor" />,
  },
  {
    title: "Worksheets",
    description:
      "Practice mindfulness and cultivating a non-judgmental attitude towards oneself with worksheet from therapist",
    icon: <Notebook size={24} color="currentColor" />,
  },
];

const useStyles = createStyles((theme) => ({
  title: {
    fontSize: rem(34),
    fontWeight: 900,
    marginTop: 0,

    [theme.fn.smallerThan("sm")]: {
      fontSize: rem(24),
    },
  },

  description: {
    maxWidth: 600,
    margin: "auto",

    "&::after": {
      content: '""',
      display: "block",
      backgroundColor: theme.primaryColor,
      width: rem(45),
      height: rem(2),
      marginTop: theme.spacing.sm,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },

  card: {
    border: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[1]
    }`,
  },

  cardTitle: {
    "&::after": {
      content: '""',
      display: "block",
      backgroundColor: theme.primaryColor,
      width: rem(45),
      height: rem(2),
      marginTop: theme.spacing.sm,
    },
  },
}));

export function FeaturesCards() {
  const { classes, theme } = useStyles();
  const { height, width } = useViewportSize();

  const features = mockdata.map((feature) => (
    <Card
      key={feature.title}
      shadow="md"
      radius="md"
      className={classes.card}
      padding="xl"
    >
      {feature.icon}
      <Text fz="lg" fw={500} className={classes.cardTitle} mt="md">
        {feature.title}
      </Text>
      <Text fz="sm" c="dimmed" mt="sm">
        {feature.description}
      </Text>
    </Card>
  ));

  return (
    <Flex direction="column" justify="space-between" mt={10} h={height - 60}>
      <Container size="lg" py="xl">
        <Title order={2} className={classes.title} ta="center" mt="sm">
          <Group position="center">
            <Badge variant="filled" size="lg">
              Progress Visualized
            </Badge>
          </Group>
        </Title>

        <Text c="dimmed" className={classes.description} ta="center" mt="md">
          Never be afraid of your own struggles
        </Text>

        <SimpleGrid
          cols={3}
          spacing="xl"
          mt={50}
          breakpoints={[{ maxWidth: "md", cols: 1 }]}
        >
          {features}
        </SimpleGrid>
      </Container>
      <StatsRing
        data={[
          // Pass your data to the StatsRing component
          {
            label: "Journal Entries",
            stats: "Weekly Goal - 3/5",
            progress: 60,
            color: "blue",
            icon: "up",
          },
          {
            label: "Habits Tracked",
            stats: "25%",
            progress: 25,
            color: "green",
            icon: "down",
          },
          {
            label: "Worksheets Completed",
            stats: "Goal - 2/10",
            progress: 20,
            color: "red",
            icon: "up",
          },

          // Add more data objects as needed
        ]}
      />

      <StatsCard />
    </Flex>
  );
}

// import React from 'react';
// import {
//   createStyles,
//   Badge,
//   Group,
//   Title,
//   Text,
//   Card,
//   SimpleGrid,
//   Container,
//   rem,
// } from '@mantine/core';

// const mockdata = [
//   {
//     title: 'Extreme performance',
//     description:
//       'This dust is actually a powerful poison that will even make a pro wrestler sick, Regice cloaks itself with frigid air of -328 degrees Fahrenheit',
//   },
//   {
//     title: 'Privacy focused',
//     description:
//       'People say it can run at the same speed as lightning striking, Its icy body is so cold, it will not melt even if it is immersed in magma',
//   },
//   {
//     title: 'No third parties',
//     description:
//       'They’re popular, but they’re rare. Trainers who show them off recklessly may be targeted by thieves',
//   },
// ];

// const useStyles = createStyles((theme) => ({
//   title: {
//     fontSize: rem(34),
//     fontWeight: 900,

//     [theme.fn.smallerThan('sm')]: {
//       fontSize: rem(24),
//     },
//   },

//   description: {
//     maxWidth: 600,
//     margin: 'auto',

//     '&::after': {
//       content: '""',
//       display: 'block',
//       backgroundColor: theme.primaryColor,
//       width: rem(45),
//       height: rem(2),
//       marginTop: theme.spacing.sm,
//       marginLeft: 'auto',
//       marginRight: 'auto',
//     },
//   },

//   card: {
//     border: `${rem(1)} solid ${
//       theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1]
//     }`,
//   },

//   cardTitle: {
//     '&::after': {
//       content: '""',
//       display: 'block',
//       backgroundColor: theme.primaryColor,
//       width: rem(45),
//       height: rem(2),
//       marginTop: theme.spacing.sm,
//     },
//   },
// }));

// export function FeaturesCards() {
//   const { classes, theme } = useStyles();

//   const features = mockdata.map((feature) => (
//     <Card key={feature.title} shadow="md" radius="md" className={classes.card} padding="xl">
//       <Text fz="lg" fw={500} className={classes.cardTitle} mt="md">
//         {feature.title}
//       </Text>
//       <Text fz="sm" c="dimmed" mt="sm">
//         {feature.description}
//       </Text>
//     </Card>
//   ));

//   return (
//     <Container size="lg" py="xl">
//       <Group position="center">
//         <Badge variant="filled" size="lg">
//           Dashboard Visualization
//         </Badge>
//       </Group>

//       <Title order={2} className={classes.title} ta="center" mt="sm">
//         Track your progress effortlessly
//       </Title>

//       <Text c="dimmed" className={classes.description} ta="center" mt="md">
//         Never be afraid of your own efforts
//       </Text>

//       <SimpleGrid cols={3} spacing="xl" mt={50} breakpoints={[{ maxWidth: 'md', cols: 1 }]}>
//         {features}
//       </SimpleGrid>
//     </Container>
//   );
// }

// import {
//   createStyles,
//   Badge,
//   Group,
//   Title,
//   Text,
//   Card,
//   SimpleGrid,
//   Container,
//   rem,
// } from '@mantine/core';
// // import { IconGauge, IconUser, IconCookie } from '@tabler/icons-react';

// const mockdata = [

//   {
//     title: 'Habit Tracking',
//     description:
//       'This dust is actually a powerful poison that will even make a pro wrestler sick, Regice cloaks itself with frigid air of -328 degrees Fahrenheit',
//     // icon: IconGauge,
//   },
//   {
//     title: 'Journal Entries',
//     description:
//       'People say it can run at the same speed as lightning striking, Its icy body is so cold, it will not melt even if it is immersed in magma',
//     // icon: IconUser,
//   },
//   {
//     title: 'Meditation Sessions',
//     description:
//       'They’re popular, but they’re rare. Trainers who show them off recklessly may be targeted by thieves',
//     // icon: IconCookie,
//   },
// ];

// const useStyles = createStyles((theme) => ({
//   title: {
//     fontSize: rem(34),
//     fontWeight: 900,

//     [theme.fn.smallerThan('sm')]: {
//       fontSize: rem(24),
//     },
//   },

//   description: {
//     maxWidth: 600,
//     margin: 'auto',

//     '&::after': {
//       content: '""',
//       display: 'block',
//       backgroundColor: theme.fn.primaryColor(),
//       width: rem(45),
//       height: rem(2),
//       marginTop: theme.spacing.sm,
//       marginLeft: 'auto',
//       marginRight: 'auto',
//     },
//   },

//   card: {
//     border: `${rem(1)} solid ${
//       theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1]
//     }`,
//   },

//   cardTitle: {
//     '&::after': {
//       content: '""',
//       display: 'block',
//       backgroundColor: theme.fn.primaryColor(),
//       width: rem(45),
//       height: rem(2),
//       marginTop: theme.spacing.sm,
//     },
//   },
// }));

// export function FeaturesCards() {
//   const { classes, theme } = useStyles();

//   const features = mockdata.map((feature) => (
//     <Card key={feature.title} shadow="md" radius="md" className={classes.card} padding="xl">
//       {/* <feature.icon size={rem(50)} stroke={2} color={theme.fn.primaryColor()} /> */}
//       <Text fz="lg" fw={500} className={classes.cardTitle} mt="md">
//         {feature.title}
//       </Text>
//       <Text fz="sm" c="dimmed" mt="sm">
//         {feature.description}
//       </Text>
//     </Card>
//   ));

//   return (
//     <Container size="lg" py="xl">
//       <Group position="center">
//         <Badge variant="filled" size="lg">
//           Dashboard Visualization
//         </Badge>
//       </Group>

//       <Title order={2} className={classes.title} ta="center" mt="sm">
//         Track your progress effortlessly
//       </Title>

//       <Text c="dimmed" className={classes.description} ta="center" mt="md">
//         Never be afriad of your own efforts
//       </Text>

//       <SimpleGrid cols={3} spacing="xl" mt={50} breakpoints={[{ maxWidth: 'md', cols: 1 }]}>
//         {features}
//       </SimpleGrid>
//     </Container>
//   );
// }
