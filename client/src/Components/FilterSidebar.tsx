
import React from 'react';
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  Chip,
  Slider,
  Button,
  InputAdornment,
  Box,
  Typography
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { colors, fonts } from '../styles/theme';

type FilterSidebarProps = {
  filters: {
    search: string;
    categories: string[];
    priceRange: [number, number];
  };
  categories: string[];
  priceLimits: [number, number];
  onFilterChange: (field: string, value: any) => void;
  onReset: () => void;
};

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  categories,
  priceLimits,
  onFilterChange,
  onReset
}) => {
  return (
    <Box
      sx={{
        minWidth: 320,
        maxWidth: 380,
        fontFamily: fonts?.base || 'inherit',
        position: 'sticky',
        top: 50,
        alignSelf: 'flex-start',
        height: 'fit-content',
        marginTop: 5,
        px: 2
      }}
    >
      {/* חיפוש חופשי */}
      <Typography variant="subtitle2" dir="rtl" sx={{ mb: 1 }}>חיפוש</Typography>
      <TextField
        fullWidth
        placeholder="חיפוש חופשי..."
        variant="outlined"
        value={filters.search}
        onChange={(e) => onFilterChange('search', e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: 'gray' }} />
            </InputAdornment>
          ),
          inputProps: {
            dir: 'rtl',
            style: { textAlign: 'right' },
          },
        }}
        sx={{ mb: 3 }}
      />

      {/* קטגוריות */}
      <Typography variant="subtitle2" dir="rtl" sx={{ mb: 1 }}>קטגוריות</Typography>
      <FormControl fullWidth>
        <Select
          multiple
          displayEmpty
          value={filters.categories}
          onChange={(e) => onFilterChange('categories', e.target.value)}
          renderValue={(selected: any) => {
            if (selected.length === 0) {
              return <span style={{ color: '#aaa', direction: 'rtl', textAlign: 'right', display: 'block' }}>בחר קטגוריות</span>;
            }
            return (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, direction: 'rtl' }}>
                {selected.map((value: string) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            );
          }}
          inputProps={{ dir: 'rtl' }}
          sx={{ mb: 3 }}
        >
          {categories.map((cat) => (
            <MenuItem key={cat} value={cat} dir="rtl">{cat}</MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* טווח מחירים */}
      <Typography variant="subtitle2" dir="rtl" sx={{ mb: 5 }}>טווח מחירים</Typography>
      <Slider
        value={filters.priceRange}
        onChange={(_, val) => onFilterChange('priceRange', val)}
        valueLabelDisplay="on"
        min={priceLimits[0]}
        max={priceLimits[1]}
        step={10}
        sx={{
          mb: 3,
          direction: 'ltr',
          color: colors.Primary,
          '& .MuiSlider-thumb': { backgroundColor: colors.AccentLight },
          '& .MuiSlider-track': { backgroundColor: colors.Primary },
          '& .MuiSlider-rail': { backgroundColor: '#e0e0e0' },
          '& .MuiSlider-valueLabel': {
            backgroundColor: 'transparent',
            color: colors.Primary,
            fontWeight: 'bold',
          },
        }}
      />

      <Button onClick={onReset} fullWidth sx={{ color: colors.Primary, textAlign: 'right' }}>
        איפוס מסננים
      </Button>
    </Box>
  );
};

export default FilterSidebar;
