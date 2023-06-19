import React from "react";
import {
  createStyles,
  Header,
  Menu,
  Group,
  Center,
  Burger,
  Container,
  rem,
  Button,
  Image,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconChevronDown } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { API_URL } from "../context/constants";
import { useMutation } from "react-query";

const useStyles = createStyles((theme) => ({
  text: {
    fontFamily: "Montserrat",
    fontWeight: "bold",
  },
  inner: {
    height: rem(56),
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  links: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: `${rem(8)} ${rem(12)}`,
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },

  subLink: {
    display: "block",
    textDecoration: "none",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,
  },

  linkLabel: {
    marginRight: rem(5),
  },
}));

const NavigationBar = () => {
  const navigationLinks = [
    {
      link: "/",
      label: "Dashboard",
    },
    {
      link: "/chat",
      label: "Chat",
    },
    {
      link: "#",
      label: "Tools",
      links: [
        {
          link: "/tools/journal",
          label: "Journal",
        },
        {
          link: "/tools/habbit-tracking",
          label: "Habit Tracking",
        },
      ],
    },
  ];

  interface NavLink {
    link: string;
    label: string;
    links?: NavLink[];
  }

  interface HeaderMenuColoredProps {
    links: NavLink[];
  }

  const HeaderMenuColored: React.FC<HeaderMenuColoredProps> = ({ links }) => {
    const [opened, { toggle }] = useDisclosure(false);
    const { classes } = useStyles();
    const { mutate } = useMutation(
      () =>
        fetch(`${API_URL}/logout`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }),
      {
        onSuccess: async () => {
          window.location.href = "/";
        },
      }
    );

    const items = links.map((link: NavLink) => {
      const menuItems = link.links?.map((item: NavLink) => (
        <Menu.Item key={item.link}>
          <Link to={item.link} className={classes.subLink}>
            {" "}
            {item.label}
          </Link>
        </Menu.Item>
      ));

      if (menuItems) {
        return (
          <Menu
            key={link.label}
            trigger="hover"
            transitionProps={{ exitDuration: 0 }}
            withinPortal
          >
            <Menu.Target>
              <Link to={link.link} className={classes.link}>
                <Center>
                  <span className={classes.linkLabel}>{link.label}</span>
                  <IconChevronDown size="0.9rem" stroke={1.5} />
                </Center>
              </Link>
            </Menu.Target>
            <Menu.Dropdown>{menuItems}</Menu.Dropdown>
          </Menu>
        );
      }

      return (
        <Link key={link.label} to={link.link} className={classes.link}>
          {link.label}
        </Link>
      );
    });

    return (
      <Header height={56}>
        <Container>
          <div className={classes.inner}>
            <Group spacing={5} className={classes.links}>
              <Image src="/logo.png" width={70} height={70} />
              <Text className={classes.text} ml={-20}>
                mindflow
              </Text>
              {items}
            </Group>
            <Group>
              <Button color="red" onClick={() => mutate()}>
                Sign Out
              </Button>
            </Group>
          </div>
        </Container>
      </Header>
    );
  };

  return (
    <div>
      {/* Other components */}
      <HeaderMenuColored links={navigationLinks} />
      {/* Other components */}
    </div>
  );
};

export default NavigationBar;

// import { createStyles, Header, Menu, Group, Center, Burger, Container, rem } from '@mantine/core';
// import { useDisclosure } from '@mantine/hooks';
// import { IconChevronDown } from '@tabler/icons-react';
// // import { MantineLogo } from '@mantine/ds';

// const useStyles = createStyles((theme) => ({
//   header: {
//     backgroundColor: theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background,
//     borderBottom: 0,
//   },

//   inner: {
//     height: rem(56),
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },

//   links: {
//     [theme.fn.smallerThan('sm')]: {
//       display: 'none',
//     },
//   },

//   burger: {
//     [theme.fn.largerThan('sm')]: {
//       display: 'none',
//     },
//   },

//   link: {
//     display: 'block',
//     lineHeight: 1,
//     padding: `${rem(8)} ${rem(12)}`,
//     borderRadius: theme.radius.sm,
//     textDecoration: 'none',
//     color: theme.white,
//     fontSize: theme.fontSizes.sm,
//     fontWeight: 500,

//     '&:hover': {
//       backgroundColor: theme.fn.lighten(
//         theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background!,
//         0.1
//       ),
//     },
//   },

//   linkLabel: {
//     marginRight: rem(5),
//   },
// }));

// interface HeaderSearchProps {
//   links: { link: string; label: string; links: { link: string; label: string }[] }[];
// }

// export function HeaderMenuColored({ links }: HeaderSearchProps) {
//   const [opened, { toggle }] = useDisclosure(false);
//   const { classes } = useStyles();

//   const items = links.map((link) => {
//     const menuItems = link.links?.map((item) => (
//       <Menu.Item key={item.link}>{item.label}</Menu.Item>
//     ));

//     if (menuItems) {
//       return (
//         <Menu key={link.label} trigger="hover" transitionProps={{ exitDuration: 0 }} withinPortal>
//           <Menu.Target>
//             <a
//               href={link.link}
//               className={classes.link}
//               onClick={(event) => event.preventDefault()}
//             >
//               <Center>
//                 <span className={classes.linkLabel}>{link.label}</span>
//                 <IconChevronDown size="0.9rem" stroke={1.5} />
//               </Center>
//             </a>
//           </Menu.Target>
//           <Menu.Dropdown>{menuItems}</Menu.Dropdown>
//         </Menu>
//       );
//     }

//     return (
//       <a
//         key={link.label}
//         href={link.link}
//         className={classes.link}
//         onClick={(event) => event.preventDefault()}
//       >
//         {link.label}
//       </a>
//     );
//   });

//   return (
//     <Header height={56} className={classes.header} mb={120}>
//       <Container>
//         <div className={classes.inner}>
//           {/* <MantineLogo size={28} inverted /> */}
//           <Group spacing={5} className={classes.links}>
//             {items}
//           </Group>
//           <Burger
//             opened={opened}
//             onClick={toggle}
//             className={classes.burger}
//             size="sm"
//             color="#fff"
//           />
//         </div>
//       </Container>
//     </Header>
//   );
// }
