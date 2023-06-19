

import {
    createStyles,
    Title,
    SimpleGrid,
    Text,
    Button,
    ThemeIcon,
    Grid,
    Col,
    rem,
  } from '@mantine/core';
  import { IconFriends, IconFlame, IconMoodCheck, IconBoxMultiple1 } from '@tabler/icons-react';

  
  const useStyles = createStyles((theme) => ({
    wrapper: {
      padding: `calc(${theme.spacing.xl} * 2) ${theme.spacing.xl}`,
    },
  
    title: {
      fontFamily: `Greycliff CF, ${theme.fontFamily}`,
      fontSize: rem(36),
      fontWeight: 900,
      lineHeight: 1.1,
      marginBottom: theme.spacing.md,
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    },
  }));
  
  const features = [
    {
      icon: IconFriends,
      title: 'Support Partner',
      description: 'Someone who will help you consistently with your habit goals through practical and emotional support',
    },
    {
      icon: IconBoxMultiple1,
      title: 'Frequency',
      description: 'Showing the cumulative number of times you have hit your habit!',
    },
    {
      icon: IconMoodCheck,
      title: 'Emotional Distribution',
      description:
        'Reflect and note down how it made you feel after completing your habit everytime. It may be uncomfortable at first to challenge yourself to a new habit but you will see more and more green through positive reinforcement',
    },
    {
      icon: IconFlame,
      title: 'Habit',
      description:
        'Note down the habits you would like to develop. This can be small or big, do not limit yourself! Anything is possible',
    },
  ];
  
  export function FeaturesTitle() {
    const { classes } = useStyles();
  
    const items = features.map((feature) => (
      <div key={feature.title}>
        <ThemeIcon
          size={44}
          radius="md"
          variant="gradient"
          gradient={{ deg: 133, from: 'blue', to: 'cyan' }}
        >
          <feature.icon size={rem(26)} stroke={1.5} />
        </ThemeIcon>
        <Text fz="lg" mt="sm" fw={500}>
          {feature.title}
        </Text>
        <Text c="dimmed" fz="sm">
          {feature.description}
        </Text>
      </div>
    ));
  
    return (
      <div className={classes.wrapper}>
        <Grid gutter={80}>
          <Col span={12} md={5}>
            <Title className={classes.title} order={2}>
              Habit Management
            </Title>
            <Text c="dimmed">
              We believe everyone can develop healthy habits, 
              establish positive behavior, and cultivate activites
              that support individual well-being and recovery
              
            </Text>
  
            <Button
              variant="gradient"
              gradient={{ deg: 133, from: 'blue', to: 'cyan' }}
              size="lg"
              radius="md"
              mt="xl"
            >
              Start Tracking!
            </Button>
          </Col>
          <Col span={12} md={7}>
            <SimpleGrid cols={2} spacing={30} breakpoints={[{ maxWidth: 'md', cols: 1 }]}>
              {items}
            </SimpleGrid>
          </Col>
        </Grid>
      </div>
    );
  }