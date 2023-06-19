import { useState } from "react";
import { Input, Button, Container, Flex } from "@mantine/core";

const MantineSearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchInputChange = (event: any) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchClick = () => {
    console.log(`Searching for "${searchQuery}"...`);
  };

  return (
    <>
      {/* <div style={{ margin: "0 15%", fontFamily: "Oxygen" }}> */}
      {/* <Flex
        style={{ margin: "0 15%" }}
        direction={{ base: "column", sm: "row" }}
        gap="sm"
        align="center"
      >
        <Input
          placeholder="Search"
          value={searchQuery}
          onChange={handleSearchInputChange}
          radius="md"
        />
        <Button onClick={handleSearchClick} size="xs" radius="xl">
          Search
        </Button>
      </Flex> */}
      {/* </div> */}
    </>
  );
};

export default MantineSearchBar;
