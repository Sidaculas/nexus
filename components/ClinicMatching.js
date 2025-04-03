import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  Button, 
  Chip,
  Divider,
  Rating,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  FormGroup,
  FormControlLabel,
  Checkbox,
  TextField,
  IconButton,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import FilterListIcon from '@mui/icons-material/FilterList';
import SortIcon from '@mui/icons-material/Sort';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import VerifiedIcon from '@mui/icons-material/Verified';
import LanguageIcon from '@mui/icons-material/Language';
import StarIcon from '@mui/icons-material/Star';

// Mock data for demonstration
const mockClinics = [
  {
    id: 'clinic-001',
    name: 'Fertility Center of Cancun',
    location: {
      city: 'Cancun',
      country: 'Mexico'
    },
    matchScore: 92,
    pricing: {
      currency: 'USD',
      ivfBasic: 6500
    },
    successRates: {
      ivf: 62
    },
    services: ['IVF', 'Egg Donation', 'Embryo Freezing'],
    languages: ['English', 'Spanish'],
    reviews: [
      { rating: 5 },
      { rating: 4 },
      { rating: 5 },
      { rating: 5 }
    ],
    images: ['/clinic1.jpg'],
    description: 'Specializing in affordable IVF and egg donation with high success rates and English-speaking staff.'
  },
  {
    id: 'clinic-002',
    name: 'Prague Fertility Center',
    location: {
      city: 'Prague',
      country: 'Czech Republic'
    },
    matchScore: 88,
    pricing: {
      currency: 'USD',
      ivfBasic: 5200
    },
    successRates: {
      ivf: 58
    },
    services: ['IVF', 'Egg Donation', 'PGT-A'],
    languages: ['English', 'Czech', 'German'],
    reviews: [
      { rating: 5 },
      { rating: 4 },
      { rating: 5 },
      { rating: 4 }
    ],
    images: ['/clinic2.jpg'],
    description: 'European clinic with comprehensive donor programs and modern facilities at competitive prices.'
  },
  {
    id: 'clinic-003',
    name: 'Bangkok IVF Center',
    location: {
      city: 'Bangkok',
      country: 'Thailand'
    },
    matchScore: 85,
    pricing: {
      currency: 'USD',
      ivfBasic: 4800
    },
    successRates: {
      ivf: 55
    },
    services: ['IVF', 'Egg Donation', 'Gender Selection'],
    languages: ['English', 'Thai'],
    reviews: [
      { rating: 4 },
      { rating: 5 },
      { rating: 4 },
      { rating: 4 }
    ],
    images: ['/clinic3.jpg'],
    description: 'World-class medical tourism destination with comprehensive fertility packages and travel support.'
  },
  {
    id: 'clinic-004',
    name: 'Kyiv Reproductive Center',
    location: {
      city: 'Kyiv',
      country: 'Ukraine'
    },
    matchScore: 82,
    pricing: {
      currency: 'USD',
      ivfBasic: 4200
    },
    successRates: {
      ivf: 52
    },
    services: ['IVF', 'Egg Donation', 'Surrogacy'],
    languages: ['English', 'Ukrainian', 'Russian'],
    reviews: [
      { rating: 4 },
      { rating: 4 },
      { rating: 5 },
      { rating: 4 }
    ],
    images: ['/clinic4.jpg'],
    description: 'Affordable European option with strong egg donation program and personalized care approach.'
  }
];

const ClinicMatching = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [clinics, setClinics] = useState([]);
  const [filteredClinics, setFilteredClinics] = useState([]);
  const [savedClinics, setSavedClinics] = useState([]);
  const [compareList, setCompareList] = useState([]);
  const [showFilters, setShowFilters] = useState(true);
  const [sortOption, setSortOption] = useState('matchScore');
  
  // Filter states
  const [filters, setFilters] = useState({
    location: '',
    services: [],
    priceRange: [0, 30000],
    successRate: 0,
    languages: []
  });
  
  useEffect(() => {
    // In a real app, this would fetch from API
    setTimeout(() => {
      setClinics(mockClinics);
      setFilteredClinics(mockClinics);
      setLoading(false);
    }, 1000);
  }, []);
  
  useEffect(() => {
    applyFilters();
  }, [filters, sortOption]);
  
  const applyFilters = () => {
    let result = [...clinics];
    
    // Apply location filter
    if (filters.location) {
      result = result.filter(clinic => 
        clinic.location.country.toLowerCase().includes(filters.location.toLowerCase()) ||
        clinic.location.city.toLowerCase().includes(filters.location.toLowerCase())
      );
    }
    
    // Apply services filter
    if (filters.services.length > 0) {
      result = result.filter(clinic => 
        filters.services.every(service => clinic.services.includes(service))
      );
    }
    
    // Apply price range filter
    result = result.filter(clinic => 
      clinic.pricing.ivfBasic >= filters.priceRange[0] && 
      clinic.pricing.ivfBasic <= filters.priceRange[1]
    );
    
    // Apply success rate filter
    if (filters.successRate > 0) {
      result = result.filter(clinic => clinic.successRates.ivf >= filters.successRate);
    }
    
    // Apply languages filter
    if (filters.languages.length > 0) {
      result = result.filter(clinic => 
        filters.languages.every(language => clinic.languages.includes(language))
      );
    }
    
    // Apply sorting
    result.sort((a, b) => {
      if (sortOption === 'matchScore') {
        return b.matchScore - a.matchScore;
      } else if (sortOption === 'priceLow') {
        return a.pricing.ivfBasic - b.pricing.ivfBasic;
      } else if (sortOption === 'priceHigh') {
        return b.pricing.ivfBasic - a.pricing.ivfBasic;
      } else if (sortOption === 'successRate') {
        return b.successRates.ivf - a.successRates.ivf;
      }
      return 0;
    });
    
    setFilteredClinics(result);
  };
  
  const handleFilterChange = (name, value) => {
    setFilters({
      ...filters,
      [name]: value
    });
  };
  
  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };
  
  const toggleSaveClinic = (clinicId) => {
    if (savedClinics.includes(clinicId)) {
      setSavedClinics(savedClinics.filter(id => id !== clinicId));
    } else {
      setSavedClinics([...savedClinics, clinicId]);
    }
  };
  
  const toggleCompareClinic = (clinicId) => {
    if (compareList.includes(clinicId)) {
      setCompareList(compareList.filter(id => id !== clinicId));
    } else {
      if (compareList.length < 3) {
        setCompareList([...compareList, clinicId]);
      } else {
        alert('You can compare up to 3 clinics at a time');
      }
    }
  };
  
  const handleCompare = () => {
    if (compareList.length < 2) {
      alert('Please select at least 2 clinics to compare');
      return;
    }
    
    // In a real app, this would navigate to a comparison page
    console.log('Comparing clinics:', compareList);
    alert('Comparison feature would navigate to a detailed comparison page');
  };
  
  const handleViewClinic = (clinicId) => {
    // In a real app, this would navigate to the clinic detail page
    console.log('Viewing clinic:', clinicId);
    alert('This would navigate to the clinic detail page');
  };
  
  const getAverageRating = (reviews) => {
    if (!reviews || reviews.length === 0) return 0;
    const sum = reviews.reduce((total, review) => total + review.rating, 0);
    return (sum / reviews.length).toFixed(1);
  };
  
  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
          <CircularProgress />
          <Typography variant="h6" sx={{ ml: 2 }}>Loading clinic matches...</Typography>
        </Box>
      </Container>
    );
  }
  
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Clinic Matching
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Discover fertility clinics worldwide that match your specific needs and preferences.
      </Typography>
      
      {compareList.length > 0 && (
        <Box sx={{ mb: 3, p: 2, bgcolor: '#E6F2F0', borderRadius: 2 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">
              {compareList.length} {compareList.length === 1 ? 'clinic' : 'clinics'} selected for comparison
            </Typography>
            <Box>
              <Button 
                variant="outlined" 
                color="primary" 
                onClick={() => setCompareList([])}
                sx={{ mr: 1 }}
              >
                Clear
              </Button>
              <Button 
                variant="contained" 
                color="primary" 
                onClick={handleCompare}
                disabled={compareList.length < 2}
                startIcon={<CompareArrowsIcon />}
              >
                Compare Clinics
              </Button>
            </Box>
          </Box>
        </Box>
      )}
      
      <Grid container spacing={3}>
        {/* Filters */}
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6">Filters</Typography>
                <IconButton onClick={() => setShowFilters(!showFilters)}>
                  <FilterListIcon />
                </IconButton>
              </Box>
              
              {showFilters && (
                <>
                  <Box mb={3}>
                    <TextField
                      fullWidth
                      label="Location"
                      placeholder="Country or city"
                      value={filters.location}
                      onChange={(e) => handleFilterChange('location', e.target.value)}
                      variant="outlined"
                      size="small"
                    />
                  </Box>
                  
                  <Box mb={3}>
                    <Typography variant="subtitle2" gutterBottom>
                      Treatment Type
                    </Typography>
                    <FormGroup>
                      {['IVF', 'Egg Donation', 'Embryo Donation', 'Surrogacy', 'PGT-A'].map((service) => (
                        <FormControlLabel
                          key={service}
                          control={
                            <Checkbox
                              checked={filters.services.includes(service)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  handleFilterChange('services', [...filters.services, service]);
                                } else {
                                  handleFilterChange('services', filters.services.filter(s => s !== service));
                                }
                              }}
                              size="small"
                            />
                          }
                          label={service}
                        />
                      ))}
                    </FormGroup>
                  </Box>
                  
                  <Box mb={3}>
                    <Typography variant="subtitle2" gutterBottom>
                      Price Range (USD)
                    </Typography>
                    <Slider
                      value={filters.priceRange}
                      onChange={(e, newValue) => handleFilterChange('priceRange', newValue)}
                      valueLabelDisplay="auto"
                      min={0}
                      max={30000}
                      step={1000}
                    />
                    <Box display="flex" justifyContent="space-between">
                      <Typography variant="body2">${filters.priceRange[0].toLocaleString()}</Typography>
                      <Typography variant="body2">${filters.priceRange[1].toLocaleString()}</Typography>
                    </Box>
                  </Box>
                  
                  <Box mb={3}>
                    <Typography variant="subtitle2" gutterBottom>
                      Minimum Success Rate
                    </Typography>
                    <FormControl fullWidth size="small">
                      <Select
                        value={filters.successRate}
                        onChange={(e) => handleFilterChange('successRate', e.target.value)}
                      >
                        <MenuItem value={0}>Any</MenuItem>
                        <MenuItem value={40}>40%+</MenuItem>
                        <MenuItem value={50}>50%+</MenuItem>
                        <MenuItem value={60}>60%+</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                  
                  <Box mb={3}>
                    <Typography variant="subtitle2" gutterBottom>
                      Languages
                    </Typography>
                    <FormGroup>
                      {['English', 'Spanish', 'French', 'German', 'Russian', 'Thai'].map((language) => (
                        <FormControlLabel
                          key={language}
                          control={
                            <Checkbox
                              checked={filters.languages.includes(language)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  handleFilterChange('languages', [...filters.languages, language]);
                                } else {
                                  handleFilterChange('languages', filters.languages.filter(l => l !== language));
                                }
                              }}
                              size="small"
                            />
                          }
                          label={language}
                        />
                      ))}
                    </FormGroup>
                  </Box>
                  
                  <Button 
                    variant="outlined" 
                    color="primary" 
                    fullWidth
                    onClick={() => {
                      setFilters({
                        location: '',
                        services: [],
                        priceRange: [0, 30000],
                        successRate: 0,
                        languages: []
                      });
                    }}
                  >
                    Reset Filters
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        </Grid>
        
        {/* Results */}
        <Grid item xs={12} md={9}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6">
              {filteredClinics.length} {filteredClinics.length === 1 ? 'match' : 'matches'} found
            </Typography>
            <Box display="flex" alignItems="center">
              <Typography variant="body2" sx={{ mr: 1 }}>Sort by:</Typography>
              <FormControl size="small" sx={{ minWidth: 150 }}>
                <Select
                  value={sortOption}
                  onChange={handleSortChange}
                  displayEmpty
                >
                  <MenuItem value="matchScore">Match Score</MenuItem>
                  <MenuItem value="priceLow">Price: Low to High</MenuItem>
                  <MenuItem value="priceHigh">Price: High to Low</MenuItem>
                  <MenuItem value="successRate">Success Rate</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
          
          {filteredClinics.length === 0 ? (
            <Card>
              <CardContent>
                <Typography variant="h6" align="center" sx={{ py: 4 }}>
                  No clinics match your current filters
                </Typography>
                <Typography variant="body2" align="center" color="text.secondary">
                  Try adjusting your filters to see more results
                </Typography>
              </CardContent>
            </Card>
          ) : (
            <Grid container spacing={3}>
              {filteredClinics.map((clinic) => (
                <Grid item xs={12} key={clinic.id}>
                  <Card>
                    <Grid container>
                      <Grid item xs={12} sm={4}>
                        <Box sx={{ position: 'relative', height: '100%', minHeight: 200 }}>
                          <CardMedia
                            component="div"
                            sx={{
                              height: '100%',
                              bgcolor: '#eee',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                          >
                            {clinic.images[0] ? (
                              <img 
                                src={clinic.images[0]} 
                                alt={clinic.name}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                              />
                            ) : (
                              <Typography>Clinic Image</Typography>
                            )}
                          </CardMedia>
                          <Chip
                            label={`${clinic.matchScore}% Match`}
                            color="primary"
                            sx={{
                              position: 'absolute',
                              top: 10,
                              right: 10,
                              fontWeight: 'bold'
                            }}
                          />
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={8}>
                        <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                          <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                            <Box>
                              <Typography variant="h5" component="div" gutterBottom>
                                {clinic.name}
                              </Typography>
                              <Box display="flex" alignItems="center" mb={1}>
                                <LocationOnIcon fontSize="small" color="action" sx={{ mr: 0.5 }} />
                                <Typography variant="body2" color="text.secondary">
                                  {clinic.location.city}, {clinic.location.country}
                                </Typography>
                              </Box>
                            </Box>
                            <Box display="flex">
                              <IconButton 
                                color={savedClinics.includes(clinic.id) ? 'primary' : 'default'}
                                onClick={() => toggleSaveClinic(clinic.id)}
                              >
                                {savedClinics.includes(clinic.id) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                              </IconButton>
                              <IconButton 
                                color={compareList.includes(clinic.id) ? 'primary' : 'default'}
                                onClick={() => toggleCompareClinic(clinic.id)}
                              >
                                <CompareArrowsIcon />
                              </IconButton>
                            </Box>
                          </Box>
                          
                          <Typography variant="body2" paragraph>
                            {clinic.description}
                          </Typography>
                          
                          <Box display="flex" flexWrap="wrap" mb={2}>
                            {clinic.services.slice(0, 3).map((service) => (
                              <Chip 
                                key={service} 
                                label={service} 
                                size="small" 
                                sx={{ mr: 0.5, mb: 0.5 }}
                              />
                            ))}
                            {clinic.services.length > 3 && (
                              <Chip 
                                label={`+${clinic.services.length - 3} more`} 
                                size="small" 
                                variant="outlined"
                                sx={{ mr: 0.5, mb: 0.5 }}
                              />
                            )}
                          </Box>
                          
                          <Grid container spacing={2} sx={{ mt: 'auto' }}>
                            <Grid item xs={6} sm={3}>
                              <Box textAlign="center">
                                <Typography variant="h6" color="primary">
                                  ${clinic.pricing.ivfBasic.toLocaleString()}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                  Basic IVF Cost
                                </Typography>
                              </Box>
                            </Grid>
                            <Grid item xs={6} sm={3}>
                              <Box textAlign="center">
                                <Typography variant="h6" color="primary">
                                  {clinic.successRates.ivf}%
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                  Success Rate
                                </Typography>
                              </Box>
                            </Grid>
                            <Grid item xs={6} sm={3}>
                              <Box textAlign="center">
                                <Box display="flex" alignItems="center" justifyContent="center">
                                  <Rating 
                                    value={parseFloat(getAverageRating(clinic.reviews))} 
                                    precision={0.1} 
                                    readOnly 
                                    size="small"
                                  />
                                  <Typography variant="body2" sx={{ ml: 0.5 }}>
                                    {getAverageRating(clinic.reviews)}
                                  </Typography>
                                </Box>
                                <Typography variant="caption" color="text.secondary">
                                  {clinic.reviews.length} Reviews
                                </Typography>
                              </Box>
                            </Grid>
                            <Grid item xs={6} sm={3}>
                              <Box textAlign="center">
                                <Typography variant="body2">
                                  {clinic.languages.slice(0, 2).join(', ')}
                                  {clinic.languages.length > 2 && '...'}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                  Languages
                                </Typography>
                              </Box>
                            </Grid>
                          </Grid>
                          
                          <Box display="flex" justifyContent="flex-end" mt={2}>
                            <Button 
                              variant="outlined" 
                              color="primary" 
                              onClick={() => handleViewClinic(clinic.id)}
                              sx={{ mr: 1 }}
                            >
                              View Details
                            </Button>
                            <Button 
                              variant="contained" 
                              color="primary"
                            >
                              Contact Clinic
                            </Button>
                          </Box>
                        </CardContent>
                      </Grid>
                    </Grid>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Grid>
      </Grid>
      
      <Box textAlign="center" mt={6}>
        <Typography variant="body1">
          Need help choosing the right clinic?
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          sx={{ mt: 2 }}
        >
          Chat with our AI Fertility Coach
        </Button>
      </Box>
    </Container>
  );
};

export default ClinicMatching;
