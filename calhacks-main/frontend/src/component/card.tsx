
import { createStyles, ThemeIcon, Progress, Text, Group, Badge, Paper, rem } from '@mantine/core';
import { CloudStorm} from 'tabler-icons-react';


const ICON_SIZE = rem(60);

const useStyles = createStyles((theme) => ({
  card: {
    position: 'relative',
    overflow: 'visible',
    padding: theme.spacing.xl,
    paddingTop: `calc(${theme.spacing.xl} * 1.5 + ${ICON_SIZE} / 3)`,
  },


  icon: {
    position: 'absolute',
    top: `calc(-${ICON_SIZE} / 3)`,
    left: `calc(50% - ${ICON_SIZE} / 2)`,
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1,
  },
}));

export function StatsCard() {
  const { classes } = useStyles();

  return (
    <Paper radius="md" withBorder className={classes.card} mt={`calc(${ICON_SIZE} / 3)`}>
      <ThemeIcon className={classes.icon} size={ICON_SIZE} radius={ICON_SIZE}>
        <CloudStorm size="2rem" stroke="1.5" /> {/* Convert stroke value to a string */}
      </ThemeIcon>
        Challenge of the Month: Meet 6 new people!
      <Text ta="center" fw={700} className={classes.title}>
        
      </Text>
      <Text c="dimmed" ta="center" fz="sm">
        2 people / week
      </Text>

      <Group position="apart" mt="xs">
        <Text fz="sm" color="dimmed">
          Progress..
        </Text>
        <Text fz="sm" color="dimmed">
          67%
        </Text>
      </Group>

      <Progress value={62} mt={5} />

      <Group position="apart" mt="md">
        <Text fz="sm">4 / 6 people</Text>
        <Badge size="sm">8 days left</Badge>
      </Group>
    </Paper>
  );
}
