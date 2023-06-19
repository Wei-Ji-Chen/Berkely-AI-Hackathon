import { Box, Container, Flex, Group, Text, createStyles } from "@mantine/core";

interface Props {
  role: "user" | "assistant";
  children: string;
}

const useStyles = createStyles((theme) => ({
  text: {
    maxWidth: "60ch",
  },

  user: {
    float: "right",
  },

  assistant: {
    float: "left",
  },
}));

export function Bubble(props: Props) {
  const { classes } = useStyles();

  return (
    <Flex justify={props.role === "user" ? "end" : "start"}>
      <div className={props.role === "user" ? classes.user : classes.assistant}>
        <Box
          sx={(theme) => ({
            backgroundColor:
              props.role === "user"
                ? theme.colors.gray[0]
                : theme.colors.grape[1],
            padding: theme.spacing.md,
            borderRadius: theme.radius.md,
          })}
        >
          <Text className={classes.text}>{props.children}</Text>
        </Box>
      </div>
    </Flex>
  );
}
