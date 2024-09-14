import { Box, Typography } from "@mui/material"
import { Tabs, TabsList as  BaseTabsList, Tab as BaseTab, TabPanel} from "@mui/base"
import styled from "@emotion/styled/base";
import { IngredientRecipeForm } from "./IngredientRecipeForm";

const blue = {
  50: '#F0F7FF',
  100: '#C2E0FF',
  200: '#80BFFF',
  300: '#66B2FF',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  700: '#0059B2',
  800: '#004C99',
  900: '#003A75',
};

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

const TabsList = styled(BaseTabsList)(
  () => `
  min-width: 300px;
  border-radius: 12px;
  margin-bottom: 16px;
  display: flex;
  flexWrap : wrap;
  align-items: center;
  justify-content: center;
  align-content: space-between;
  box-shadow: 0px 4px 30px ${grey[900]};
  `,
);

const Tab = styled(BaseTab)`
  font-family: 'IBM Plex Sans', sans-serif;
  color: #fff;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 600;
  background-color: transparent;
  width: 100%;
  padding: 10px 12px;
  margin: 6px;
  border: none;
  border-radius: 7px;
  display: flex;
  justify-content: center;

  &:focus {
    color: #fff;
    outline: 3px solid ${blue[200]};
  }
`;

interface IProps {
  ingredientNames : string[]
}

export const IngredientTabs = ({ingredientNames} : IProps) => {

  return(
   <Tabs defaultValue={ingredientNames[0]}>
      <TabsList>
      {ingredientNames.map((ing, index) => <Box key={ing + index} sx={{width :'40%'}}>
        <Tab value={ing}>
          {ing}
        </Tab>
        </Box>
      )}
      </TabsList>
      {ingredientNames.map((ing, index) => <Box key={ing + index} sx={{}}>
        <TabPanel value={ing}>
          <Typography variant ='h4'>{ing}</Typography>
          <IngredientRecipeForm ingredientName ={ing}/>
        </TabPanel>
        </Box>
      )}
  </Tabs>
  )
}