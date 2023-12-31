
import { FeaturesTitle } from "./habit-intro";
import { createStyles, Table, Progress, Anchor, Text, Group, ScrollArea, rem, Container } from '@mantine/core';
import './habit-tracking.css'

const useStyles = createStyles((theme) => ({
  progressBar: {
    '&:not(:first-of-type)': {
      borderLeft: `${rem(3)} solid ${
        theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white
      }`,
    },
  },
}));

interface TableReviewsProps {
  data: {
    title: string;
    author: string;
    reviews: { positive: number; negative: number };
    frequency: number;
  }[];
}

export function TableReviews({ data }: TableReviewsProps) {
  const { classes, theme } = useStyles();

  const rows = data.map((row) => {
    const totalReviews = row.frequency;
    const positiveReviews = (row.reviews.positive / 100) * 100;
    const negativeReviews = (row.reviews.negative / 100) * 100;

    return (
      <tr key={row.title}>
        <td>
          <Anchor component="button" fz="sm">
            {row.title}
          </Anchor>
        </td>
        <td>
          <Anchor component="button" fz="sm">
            {row.author}
          </Anchor>
        </td>
        <td>{Intl.NumberFormat().format(totalReviews)}</td>
        <td>
          <Group position="apart">
            <Text fz="xs" c="teal" weight={700}>   
              {positiveReviews.toFixed(0)}%
            </Text>
            <Text fz="xs" c="red" weight={700}>
              {negativeReviews.toFixed(0)}%
            </Text>
          </Group>
          <Progress
            classNames={{ bar: classes.progressBar }}
            sections={[
              {
                value: positiveReviews,
                color: theme.colorScheme === 'dark' ? theme.colors.teal[9] : theme.colors.teal[6],
              },
              {
                value: negativeReviews,
                color: theme.colorScheme === 'dark' ? theme.colors.red[9] : theme.colors.red[6],
              },
            ]}
          />
        </td>
      </tr>
    );
  });

  return (
    <Container>
      <FeaturesTitle />
      
      <ScrollArea m={-25}>
        <div className='align-bottom'>
          <Table sx={{ minWidth: 800 }}  verticalSpacing="xs">
            <thead>
              <tr>
                <th>Habit</th>
                <th>Support Partner</th>
                <th>Frequency</th>
                <th>Emotional Distribution</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
        </div>
      </ScrollArea>
    </Container>
  );
}



// import { FeaturesTitle } from "./habit-intro";
// import { createStyles, Table, Progress, Anchor, Text, Group, ScrollArea, rem } from '@mantine/core';

// const useStyles = createStyles((theme) => ({
//   progressBar: {
//     '&:not(:first-of-type)': {
//       borderLeft: `${rem(3)} solid ${
//         theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white
//       }`,
//     },
//   },
// }));

// interface TableReviewsProps {
//   data: {
//     title: string;
//     author: string;
//     year: number;
//     reviews: { positive: number; negative: number };
//     frequency: number;

//   }[];
// }

// export function TableReviews({ data }: TableReviewsProps) {
//   const { classes, theme } = useStyles();

//   const rows = data.map((row) => {
    
//     //const totalReviews = row.reviews.negative + row.reviews.positive;
//     const totalReviews = row.frequency; 
    
//     const positiveReviews = (row.reviews.positive / 100) * 100;
//     const negativeReviews = (row.reviews.negative / 100) * 100;

//     return (
//       <tr key={row.title}>
//         <td>
//           <Anchor component="button" fz="sm">
//             {row.title}
//           </Anchor>
//         </td>
//         <td>{row.year}</td>
//         <td>
//           <Anchor component="button" fz="sm">
//             {row.author}
//           </Anchor>
//         </td>
//         <td>{Intl.NumberFormat().format(totalReviews)}</td>
//         <td>
//           <Group position="apart">
//             <Text fz="xs" c="teal" weight={700}>   
//               {positiveReviews.toFixed(0)}%
//             </Text>
//             <Text fz="xs" c="red" weight={700}>
//               {negativeReviews.toFixed(0)}%
//             </Text>
//           </Group>
//           <Progress
//             classNames={{ bar: classes.progressBar }}
//             sections={[
//               {
//                 value: positiveReviews,
//                 color: theme.colorScheme === 'dark' ? theme.colors.teal[9] : theme.colors.teal[6],
//               },
//               {
//                 value: negativeReviews,
//                 color: theme.colorScheme === 'dark' ? theme.colors.red[9] : theme.colors.red[6],
//               },
//             ]}
//           />
//         </td>
       
//       </tr>
//     );
//   });

//   return (
//     <>
//       <FeaturesTitle />
//       <ScrollArea>
//         <Table sx={{ minWidth: 800 }} verticalSpacing="xs">
//           <thead>
//             <tr>
//               <th>Habit</th>
//               <th>Year</th>
//               <th>Support Partner</th>
//               <th>Frequency</th>
//               <th>Emotional Distribution</th>
//             </tr>
//           </thead>
//           <tbody>{rows}</tbody>
//         </Table>
//       </ScrollArea>
//     </>
//   );
// }



// import { createStyles, Table, Progress, Anchor, Text, Group, ScrollArea, rem } from '@mantine/core';
// import { FeaturesTitle } from "./habit-intro";


// const useStyles = createStyles((theme) => ({
//   progressBar: {
//     '&:not(:first-of-type)': {
//       borderLeft: `${rem(3)} solid ${
//         theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white
//       }`,
//     },
//   },
// }));

// interface TableReviewsProps {
//   data: {
//     title: string;
//     author: string;
//     year: number;
//     reviews: { positive: number; negative: number };
//     frequency: number;

//   }[];
// }

// export function TableReviews({ data }: TableReviewsProps) {
//   const { classes, theme } = useStyles();

//   const rows = data.map((row) => {
    
//     //const totalReviews = row.reviews.negative + row.reviews.positive;
//     const totalReviews = row.frequency; 
    
//     const positiveReviews = (row.reviews.positive / 100) * 100;
//     const negativeReviews = (row.reviews.negative / 100) * 100;

//     return (
//       <tr key={row.title}>
//         <td>
//           <Anchor component="button" fz="sm">
//             {row.title}
//           </Anchor>
//         </td>
//         <td>{row.year}</td>
//         <td>
//           <Anchor component="button" fz="sm">
//             {row.author}
//           </Anchor>
//         </td>
//         <td>{Intl.NumberFormat().format(totalReviews)}</td>
//         <td>
//           <Group position="apart">
//             <Text fz="xs" c="teal" weight={700}>   
//               {positiveReviews.toFixed(0)}%
//             </Text>
//             <Text fz="xs" c="red" weight={700}>
//               {negativeReviews.toFixed(0)}%
//             </Text>
//           </Group>
//           <Progress
//             classNames={{ bar: classes.progressBar }}
//             sections={[
//               {
//                 value: positiveReviews,
//                 color: theme.colorScheme === 'dark' ? theme.colors.teal[9] : theme.colors.teal[6],
//               },
//               {
//                 value: negativeReviews,
//                 color: theme.colorScheme === 'dark' ? theme.colors.red[9] : theme.colors.red[6],
//               },
//             ]}
//           />
//         </td>
       
//       </tr>
//     );
//   });

  

//   return (
 
//     <ScrollArea>
//       <Table sx={{ minWidth: 800 }} verticalSpacing="xs">
//         <thead>
//           <tr>
//             <th>Habit</th>
//             <th>Year</th>
//             <th>Support Partner</th>
//             <th>Frequency</th>
//             <th>Emotional Distribution</th>
//           </tr>
//         </thead>
//         <tbody>{rows}</tbody>
//       </Table>
//     </ScrollArea>
  
//   );
// }