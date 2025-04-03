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
  CircularProgress,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FilterListIcon from '@mui/icons-material/FilterList';
import SortIcon from '@mui/icons-material/Sort';
import PersonIcon from '@mui/icons-material/Person';
import SchoolIcon from '@mui/icons-material/School';
import FaceIcon from '@mui/icons-material/Face';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

// Mock data for demonstration
const mockDonors = [
  {
    id: 'donor-001',
    type: 'egg',
    donorId: 'EC-2458',
    clinicId: 'clinic-001',
    clinicName: 'Fertility Center of Cancun',
    matchScore: 95,
    basicInfo: {
      age: 28,
      ethnicity: 'Caucasian',
      height: 168, // cm
      weight: 58, // kg
      hairColor: 'Blonde',
      eyeColor: 'Blue',
      bloodType: 'O+'
    },
    education: 'Bachelor\'s Degree in Psychology',
    occupation: 'Elementary School Teacher',
    medicalHistory: {
      geneticScreening: true,
      geneticConditions: [],
      familyHistory: {
        cancer: false,
        diabetes: false,
        heartDisease: false,
        mentalHealth: false
      }
    },
    availability: true,
    cost: 8000,
    currency: 'USD',
    photos: ['/donor1-childhood.jpg'],
    additionalInfo: 'Athletic, enjoys painting and outdoor activities. Plays piano since age 6.'
  },
  {
    id: 'donor-002',
    type: 'egg',
    donorId: 'EC-3104',
    clinicId: 'clinic-001',
    clinicName: 'Fertility Center of Cancun',
    matchScore: 90,
    basicInfo: {
      age: 25,
      ethnicity: 'Hispanic',
      height: 165, // cm
      weight: 54, // kg
      hairColor: 'Brown',
      eyeColor: 'Brown',
      bloodType: 'A+'
    },
    education: 'Master\'s Degree in Education',
    occupation: 'High School Teacher',
    medicalHistory: {
      geneticScreening: true,
      geneticConditions: [],
      familyHistory: {
        cancer: false,
        diabetes: true,
        heartDisease: false,
        mentalHealth: false
      }
    },
    availability: true,
    cost: 7500,
    currency: 'USD',
    photos: ['/donor2-childhood.jpg'],
    additionalInfo: 'Bilingual in English and Spanish. Enjoys dancing and cooking. Volunteer at local community center.'
  },
  {
    id: 'donor-003',
    type: 'egg',
    donorId: 'EC-1872',
    clinicId: 'clinic-003',
    clinicName: 'Bangkok IVF Center',
    matchScore: 87,
    basicInfo: {
      age: 26,
      ethnicity: 'Asian',
      height: 162, // cm
      weight: 52, // kg
      hairColor: 'Black',
      eyeColor: 'Brown',
      bloodType: 'B+'
    },
    education: 'Bachelor\'s Degree in Nursing',
    occupation: 'Registered Nurse',
    medicalHistory: {
      geneticScreening: true,
      geneticConditions: [],
      familyHistory: {
        cancer: false,
        diabetes: false,
        heartDisease: false,
        mentalHealth: false
      }
    },
    availability: true,
    cost: 6500,
    currency: 'USD',
    photos: ['/donor3-childhood.jpg'],
    additionalInfo: 'Speaks English and Thai. Enjoys reading and yoga. Passionate about healthcare and helping others.'
  },
  {
    id: 'donor-004',
    type: 'egg',
    donorId: 'EC-4219',
    clinicId: 'clinic-002',
    clinicName: 'Prague Fertility Center',
    matchScore: 84,
    basicInfo: {
      age: 27,
      ethnicity: 'Caucasian',
      height: 175, // cm
      weight: 65, // kg
      hairColor: 'Brown',
      eyeColor: 'Green',
      bloodType: 'A-'
    },
    education: 'Bachelor\'s Degree in Business',
    occupation: 'Marketing Specialist',
    medicalHistory: {
      geneticScreening: true,
      geneticConditions: [],
      familyHistory: {
        cancer: false,
        diabetes: false,
        heartDisease: true,
        mentalHealth: false
      }
    },
    availability: true,
    cost: 6800,
    currency: 'USD',
    photos: ['/donor4-childhood.jpg'],
    additionalInfo: 'Multilingual (English, Czech, German). Athletic and enjoys hiking. Plays violin and guitar.'
  },
  {
    id: 'donor-005',
    type: 'sperm',
    donorId: 'SC-5872',
    clinicId: 'clinic-001',
    clinicName: 'Fertility Center of Cancun',
    matchScore: 92,
    basicInfo: {
      age: 29,
      ethnicity: 'Caucasian',
      height: 183, // cm
      weight: 78, // kg
      hairColor: 'Brown',
      eyeColor: 'Blue',
      bloodType: 'O+'
    },
    education: 'PhD in Computer Science',
    occupation: 'Software Engineer',
    medicalHistory: {
      geneticScreening: true,
      geneticConditions: [],
      familyHistory: {
        cancer: false,
        diabetes: false,
        heartDisease: false,
        mentalHealth: false
      }
    },
    availability: true,
    cost: 1200,
    currency: 'USD',
    photos: ['/donor5-childhood.jpg'],
    additionalInfo: 'Athletic, enjoys rock climbing and chess. Plays piano and has perfect pitch.'
  },
  {
    id: 'donor-006',
    type: 'embryo',
    donorId: 'EM-1024',
    clinicId: 'clinic-002',
    clinicName: 'Prague Fertility Center',
    matchScore: 89,
    basicInfo: {
      age: null, // Not applicable for embryos
      ethnicity: 'Caucasian',
      height: null, // Not applicable for embryos
      weight: null, // Not applicable for embryos
      hairColor: null, // Not applicable for embryos
      eyeColor: null, // Not applicable for embryos
      bloodType: 'AB+'
    },
    education: null, // Not applicable for embryos
    occupation: null, // Not applicable for embryos
    medicalHistory: {
      geneticScreening: true,
      geneticConditions: [],
      familyHistory: {
        cancer: false,
        diabetes: false,
        heartDisease: false,
        mentalHealth: false
      }
    },
    availability: true,
    cost: 9500,
    currency: 'USD',
    photos: [], // No photos for embryos
    additionalInfo: 'Grade A embryo, 5-day blastocyst. Genetic parents: Mother (32, Teacher) and Father (34, Engineer).'
  }
];

const DonorMatching = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [donors, setDonors] = useState([]);
  const [filteredDonors, setFilteredDonors] = useState([]);
  const [savedDonors, setSavedDonors] = useState([]);
  const [showFilters, setShowFilters] = useState(true);
  const [sortOption, setSortOption] = useState('matchScore');
  const [selectedDonor, setSelectedDonor] = useState(null);
  const [openDonorDialog, setOpenDonorDialog] = useState(false);
  const [donorType, setDonorType] = useState('egg'); // Default to egg donors
  
  // Filter states
  const [filters, setFilters] = useState({
    ethnicity: [],
    ageRange: [20, 35],
    clinicId: '',
    priceRange: [0, 15000],
    geneticScreening: false,
    hairColor: [],
    eyeColor: []
  });
  
  useEffect(() => {
    // In a real app, this would fetch from API
    setTimeout(() => {
      setDonors(mockDonors);
      setFilteredDonors(mockDonors.filter(donor => donor.type === donorType));
      setLoading(false);
    }, 1000);
  }, []);
  
  useEffect(() => {
    applyFilters();
  }, [filters, sortOption, donorType]);
  
  const applyFilters = () => {
    let result = [...donors].filter(donor => donor.type === donorType);
    
    // Apply ethnicity filter
    if (filters.ethnicity.length > 0) {
      result = result.filter(donor => 
        filters.ethnicity.includes(donor.basicInfo.ethnicity)
      );
    }
    
    // Apply age range filter (not applicable for embryos)
    if (donorType !== 'embryo') {
      result = result.filter(donor => 
        donor.basicInfo.age >= filters.ageRange[0] && 
        donor.basicInfo.age <= filters.ageRange[1]
      );
    }
    
    // Apply clinic filter
    if (filters.clinicId) {
      result = result.filter(donor => donor.clinicId === filters.clinicId);
    }
    
    // Apply price range filter
    result = result.filter(donor => 
      donor.cost >= filters.priceRange[0] && 
      donor.cost <= filters.priceRange[1]
    );
    
    // Apply genetic screening filter
    if (filters.geneticScreening) {
      result = result.filter(donor => donor.medicalHistory.geneticScreening);
    }
    
    // Apply hair color filter
    if (filters.hairColor.length > 0 && donorType !== 'embryo') {
      result = result.filter(donor => 
        filters.hairColor.includes(donor.basicInfo.hairColor)
      );
    }
    
    // Apply eye color filter
    if (filters.eyeColor.length > 0 && donorType !== 'embryo') {
      result = result.filter(donor => 
        filters.eyeColor.includes(donor.basicInfo.eyeColor)
      );
    }
    
    // Apply sorting
    result.sort((a, b) => {
      if (sortOption === 'matchScore') {
        return b.matchScore - a.matchScore;
      } else if (sortOption === 'priceLow') {
        return a.cost - b.cost;
      } else if (sortOption === 'priceHigh') {
        return b.cost - a.cost;
      } else if (sortOption === 'age' && donorType !== 'embryo') {
        return a.basicInfo.age - b.basicInfo.age;
      }
      return 0;
    });
    
    setFilteredDonors(result);
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
  
  const handleDonorTypeChange = (event) => {
    setDonorType(event.target.value);
  };
  
  const toggleSaveDonor = (donorId) => {
    if (savedDonors.includes(donorId)) {
      setSavedDonors(savedDonors.filter(id => id !== donorId));
    } else {
      setSavedDonors([...savedDonors, donorId]);
    }
  };
  
  const handleViewDonor = (donor) => {
    setSelectedDonor(donor);
    setOpenDonorDialog(true);
  };
  
  const handleCloseDonorDialog = () => {
    setOpenDonorDialog(false);
  };
  
  const formatHeight = (cm) => {
    if (!cm) return 'N/A';
    const feet = Math.floor(cm / 30.48);
    const inches = Math.round((cm - (feet * 30.48)) / 2.54);
    return `${feet}'${inches}" (${cm} cm)`;
  };
  
  const formatWeight = (kg) => {
    if (!kg) return 'N/A';
    const lbs = Math.round(kg * 2.20462);
    return `${lbs} lbs (${kg} kg)`;
  };
  
  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
          <CircularProgress />
          <Typography variant="h6" sx={{ ml: 2 }}>Loading donor matches...</Typography>
        </Box>
      </Container>
    );
  }
  
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Donor Matching
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Find egg, sperm, and embryo donors that match your specific requirements.
      </Typography>
      
      <Box mb={4}>
        <Tabs 
          value={donorType} 
          onChange={(e, newValue) => setDonorType(newValue)}
          centered
          sx={{ mb: 2 }}
        >
          <Tab label="Egg Donors" value="egg" />
          <Tab label="Sperm Donors" value="sperm" />
          <Tab label="Embryo Donors" value="embryo" />
        </Tabs>
      </Box>
      
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
                    <Typography variant="subtitle2" gutterBottom>
                      Ethnicity
                    </Typography>
                    <FormGroup>
                      {['Caucasian', 'Hispanic', 'Asian', 'African', 'Middle Eastern', 'Mixed'].map((ethnicity) => (
                        <FormControlLabel
                          key={ethnicity}
                          control={
                            <Checkbox
                              checked={filters.ethnicity.includes(ethnicity)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  handleFilterChange('ethnicity', [...filters.ethnicity, ethnicity]);
                                } else {
                                  handleFilterChange('ethnicity', filters.ethnicity.filter(e => e !== ethnicity));
                                }
                              }}
                              size="small"
                            />
                          }
                          label={ethnicity}
                        />
                      ))}
                    </FormGroup>
                  </Box>
                  
                  {donorType !== 'embryo' && (
                    <Box mb={3}>
                      <Typography variant="subtitle2" gutterBottom>
                        Age Range
                      </Typography>
                      <Slider
                        value={filters.ageRange}
                        onChange={(e, newValue) => handleFilterChange('ageRange', newValue)}
                        valueLabelDisplay="auto"
                        min={18}
                        max={40}
                        step={1}
                      />
                      <Box display="flex" justifyContent="space-between">
                        <Typography variant="body2">{filters.ageRange[0]} years</Typography>
                        <Typography variant="body2">{filters.ageRange[1]} years</Typography>
                      </Box>
                    </Box>
                  )}
                  
                  <Box mb={3}>
                    <Typography variant="subtitle2" gutterBottom>
                      Clinic
                    </Typography>
                    <FormControl fullWidth size="small">
                      <Select
                        value={filters.clinicId}
                        onChange={(e) => handleFilterChange('clinicId', e.target.value)}
                        displayEmpty
                      >
                        <MenuItem value="">All Clinics</MenuItem>
                        <MenuItem value="clinic-001">Fertility Center of Cancun</MenuItem>
                        <MenuItem value="clinic-002">Prague Fertility Center</MenuItem>
                        <MenuItem value="clinic-003">Bangkok IVF Center</MenuItem>
                        <MenuItem value="clinic-004">Kyiv Reproductive Center</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                  
                  <Box mb={3}>
                    <Typography variant="subtitle2" gutterBottom>
                      Price Range ({donorType === 'egg' ? 'USD' : donorType === 'sperm' ? 'USD' : 'USD'})
                    </Typography>
                    <Slider
                      value={filters.priceRange}
                      onChange={(e, newValue) => handleFilterChange('priceRange', newValue)}
                      valueLabelDisplay="auto"
                      min={0}
                      max={donorType === 'egg' ? 15000 : donorType === 'sperm' ? 2000 : 15000}
                      step={donorType === 'sperm' ? 100 : 500}
                    />
                    <Box display="flex" justifyContent="space-between">
                      <Typography variant="body2">${filters.priceRange[0].toLocaleString()}</Typography>
                      <Typography variant="body2">${filters.priceRange[1].toLocaleString()}</Typography>
                    </Box>
                  </Box>
                  
                  <Box mb={3}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={filters.geneticScreening}
                          onChange={(e) => handleFilterChange('geneticScreening', e.target.checked)}
                        />
                      }
                      label="Genetic Screening Only"
                    />
                  </Box>
                  
                  {donorType !== 'embryo' && (
                    <>
                      <Box mb={3}>
                        <Typography variant="subtitle2" gutterBottom>
                          Hair Color
                        </Typography>
                        <FormGroup>
                          {['Blonde', 'Brown', 'Black', 'Red', 'Auburn'].map((color) => (
                            <FormControlLabel
                              key={color}
                              control={
                                <Checkbox
                                  checked={filters.hairColor.includes(color)}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      handleFilterChange('hairColor', [...filters.hairColor, color]);
                                    } else {
                                      handleFilterChange('hairColor', filters.hairColor.filter(c => c !== color));
                                    }
                                  }}
                                  size="small"
                                />
                              }
                              label={color}
                            />
                          ))}
                        </FormGroup>
                      </Box>
                      
                      <Box mb={3}>
                        <Typography variant="subtitle2" gutterBottom>
                          Eye Color
                        </Typography>
                        <FormGroup>
                          {['Blue', 'Green', 'Brown', 'Hazel', 'Gray'].map((color) => (
                            <FormControlLabel
                              key={color}
                              control={
                                <Checkbox
                                  checked={filters.eyeColor.includes(color)}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      handleFilterChange('eyeColor', [...filters.eyeColor, color]);
                                    } else {
                                      handleFilterChange('eyeColor', filters.eyeColor.filter(c => c !== color));
                                    }
                                  }}
                                  size="small"
                                />
                              }
                              label={color}
                            />
                          ))}
                        </FormGroup>
                      </Box>
                    </>
                  )}
                  
                  <Button 
                    variant="outlined" 
                    color="primary" 
                    fullWidth
                    onClick={() => {
                      setFilters({
                        ethnicity: [],
                        ageRange: [20, 35],
                        clinicId: '',
                        priceRange: [0, donorType === 'egg' ? 15000 : donorType === 'sperm' ? 2000 : 15000],
                        geneticScreening: false,
                        hairColor: [],
                        eyeColor: []
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
              {filteredDonors.length} {filteredDonors.length === 1 ? 'match' : 'matches'} found
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
                  {donorType !== 'embryo' && <MenuItem value="age">Age: Youngest First</MenuItem>}
                </Select>
              </FormControl>
            </Box>
          </Box>
          
          {filteredDonors.length === 0 ? (
            <Card>
              <CardContent>
                <Typography variant="h6" align="center" sx={{ py: 4 }}>
                  No donors match your current filters
                </Typography>
                <Typography variant="body2" align="center" color="text.secondary">
                  Try adjusting your filters to see more results
                </Typography>
              </CardContent>
            </Card>
          ) : (
            <Grid container spacing={3}>
              {filteredDonors.map((donor) => (
                <Grid item xs={12} sm={6} md={4} key={donor.id}>
                  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ position: 'relative' }}>
                      <CardMedia
                        component="div"
                        sx={{
                          height: 200,
                          bgcolor: '#eee',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        {donor.type !== 'embryo' && donor.photos.length > 0 ? (
                          <img 
                            src={donor.photos[0]} 
                            alt={`Donor ${donor.donorId}`}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        ) : (
                          <Box textAlign="center">
                            {donor.type === 'embryo' ? (
                              <MedicalInformationIcon sx={{ fontSize: 60, color: '#aaa' }} />
                            ) : (
                              <PersonIcon sx={{ fontSize: 60, color: '#aaa' }} />
                            )}
                            <Typography variant="body2" color="text.secondary">
                              {donor.type === 'embryo' ? 'Embryo' : 'Childhood Photo'}
                            </Typography>
                          </Box>
                        )}
                      </CardMedia>
                      <Chip
                        label={`${donor.matchScore}% Match`}
                        color="primary"
                        sx={{
                          position: 'absolute',
                          top: 10,
                          right: 10,
                          fontWeight: 'bold'
                        }}
                      />
                      <IconButton 
                        sx={{
                          position: 'absolute',
                          top: 10,
                          left: 10,
                          bgcolor: 'rgba(255,255,255,0.8)'
                        }}
                        color={savedDonors.includes(donor.id) ? 'primary' : 'default'}
                        onClick={() => toggleSaveDonor(donor.id)}
                      >
                        {savedDonors.includes(donor.id) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                      </IconButton>
                    </Box>
                    
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="h6" gutterBottom>
                        Donor {donor.donorId}
                      </Typography>
                      
                      <Box display="flex" alignItems="center" mb={1}>
                        <Typography variant="body2" color="text.secondary">
                          Available at:
                        </Typography>
                        <Typography variant="body2" sx={{ ml: 1 }}>
                          {donor.clinicName}
                        </Typography>
                      </Box>
                      
                      <Divider sx={{ my: 1.5 }} />
                      
                      <Grid container spacing={1}>
                        {donor.type !== 'embryo' && (
                          <>
                            <Grid item xs={6}>
                              <Typography variant="body2" color="text.secondary">Age:</Typography>
                              <Typography variant="body2">{donor.basicInfo.age}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography variant="body2" color="text.secondary">Ethnicity:</Typography>
                              <Typography variant="body2">{donor.basicInfo.ethnicity}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography variant="body2" color="text.secondary">Hair:</Typography>
                              <Typography variant="body2">{donor.basicInfo.hairColor}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography variant="body2" color="text.secondary">Eyes:</Typography>
                              <Typography variant="body2">{donor.basicInfo.eyeColor}</Typography>
                            </Grid>
                          </>
                        )}
                        
                        {donor.type === 'embryo' && (
                          <>
                            <Grid item xs={12}>
                              <Typography variant="body2" color="text.secondary">Ethnicity:</Typography>
                              <Typography variant="body2">{donor.basicInfo.ethnicity}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                              <Typography variant="body2" color="text.secondary">Blood Type:</Typography>
                              <Typography variant="body2">{donor.basicInfo.bloodType}</Typography>
                            </Grid>
                          </>
                        )}
                        
                        <Grid item xs={12}>
                          <Typography variant="body2" color="text.secondary">Genetic Screening:</Typography>
                          <Typography variant="body2">
                            {donor.medicalHistory.geneticScreening ? 'Completed' : 'Not Completed'}
                          </Typography>
                        </Grid>
                        
                        {donor.type !== 'embryo' && (
                          <Grid item xs={12}>
                            <Typography variant="body2" color="text.secondary">Education:</Typography>
                            <Typography variant="body2">{donor.education}</Typography>
                          </Grid>
                        )}
                      </Grid>
                      
                      <Divider sx={{ my: 1.5 }} />
                      
                      <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="h6" color="primary">
                          ${donor.cost.toLocaleString()}
                        </Typography>
                        <Chip 
                          label={donor.availability ? 'Available' : 'Unavailable'} 
                          color={donor.availability ? 'success' : 'error'} 
                          size="small"
                        />
                      </Box>
                    </CardContent>
                    
                    <Box p={2} pt={0}>
                      <Button 
                        variant="contained" 
                        color="primary" 
                        fullWidth
                        onClick={() => handleViewDonor(donor)}
                      >
                        View Full Profile
                      </Button>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Grid>
      </Grid>
      
      <Box textAlign="center" mt={6}>
        <Typography variant="body1">
          Need help choosing the right donor?
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          sx={{ mt: 2 }}
        >
          Chat with our AI Fertility Coach
        </Button>
      </Box>
      
      {/* Donor Detail Dialog */}
      <Dialog
        open={openDonorDialog}
        onClose={handleCloseDonorDialog}
        maxWidth="md"
        fullWidth
      >
        {selectedDonor && (
          <>
            <DialogTitle>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h5">Donor {selectedDonor.donorId}</Typography>
                <Chip label={`${selectedDonor.matchScore}% Match`} color="primary" />
              </Box>
            </DialogTitle>
            <DialogContent dividers>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <Box sx={{ position: 'relative' }}>
                    <CardMedia
                      component="div"
                      sx={{
                        height: 300,
                        bgcolor: '#eee',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 1
                      }}
                    >
                      {selectedDonor.type !== 'embryo' && selectedDonor.photos.length > 0 ? (
                        <img 
                          src={selectedDonor.photos[0]} 
                          alt={`Donor ${selectedDonor.donorId}`}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      ) : (
                        <Box textAlign="center">
                          {selectedDonor.type === 'embryo' ? (
                            <MedicalInformationIcon sx={{ fontSize: 80, color: '#aaa' }} />
                          ) : (
                            <PersonIcon sx={{ fontSize: 80, color: '#aaa' }} />
                          )}
                          <Typography variant="body2" color="text.secondary">
                            {selectedDonor.type === 'embryo' ? 'Embryo' : 'Childhood Photo'}
                          </Typography>
                        </Box>
                      )}
                    </CardMedia>
                    <Box display="flex" justifyContent="space-between" mt={2}>
                      <Button
                        variant="outlined"
                        startIcon={savedDonors.includes(selectedDonor.id) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                        onClick={() => toggleSaveDonor(selectedDonor.id)}
                      >
                        {savedDonors.includes(selectedDonor.id) ? 'Saved' : 'Save Donor'}
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                      >
                        Request More Info
                      </Button>
                    </Box>
                    
                    <Box mt={3}>
                      <Typography variant="h6" gutterBottom>Available At</Typography>
                      <Card variant="outlined">
                        <CardContent>
                          <Typography variant="subtitle1">{selectedDonor.clinicName}</Typography>
                          <Button 
                            variant="text" 
                            color="primary" 
                            size="small" 
                            sx={{ mt: 1 }}
                          >
                            View Clinic Details
                          </Button>
                        </CardContent>
                      </Card>
                    </Box>
                    
                    <Box mt={3}>
                      <Typography variant="h6" gutterBottom>Cost</Typography>
                      <Card variant="outlined">
                        <CardContent>
                          <Typography variant="h5" color="primary">${selectedDonor.cost.toLocaleString()}</Typography>
                          <Typography variant="body2" color="text.secondary">
                            {selectedDonor.type === 'egg' ? 'Egg donation cycle' : 
                             selectedDonor.type === 'sperm' ? 'Per vial' : 'Per embryo'}
                          </Typography>
                          <Chip 
                            label={selectedDonor.availability ? 'Currently Available' : 'Currently Unavailable'} 
                            color={selectedDonor.availability ? 'success' : 'error'} 
                            size="small"
                            sx={{ mt: 1 }}
                          />
                        </CardContent>
                      </Card>
                    </Box>
                  </Box>
                </Grid>
                
                <Grid item xs={12} md={8}>
                  <Tabs value={0}>
                    <Tab label="Donor Profile" />
                  </Tabs>
                  
                  <Box mt={3}>
                    <Typography variant="h6" gutterBottom>Basic Information</Typography>
                    <TableContainer component={Paper} variant="outlined">
                      <Table size="small">
                        <TableBody>
                          {selectedDonor.type !== 'embryo' && (
                            <>
                              <TableRow>
                                <TableCell component="th" scope="row" sx={{ width: '40%' }}>Age</TableCell>
                                <TableCell>{selectedDonor.basicInfo.age}</TableCell>
                              </TableRow>
                            </>
                          )}
                          <TableRow>
                            <TableCell component="th" scope="row">Ethnicity</TableCell>
                            <TableCell>{selectedDonor.basicInfo.ethnicity}</TableCell>
                          </TableRow>
                          {selectedDonor.type !== 'embryo' && (
                            <>
                              <TableRow>
                                <TableCell component="th" scope="row">Height</TableCell>
                                <TableCell>{formatHeight(selectedDonor.basicInfo.height)}</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell component="th" scope="row">Weight</TableCell>
                                <TableCell>{formatWeight(selectedDonor.basicInfo.weight)}</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell component="th" scope="row">Hair Color</TableCell>
                                <TableCell>{selectedDonor.basicInfo.hairColor}</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell component="th" scope="row">Eye Color</TableCell>
                                <TableCell>{selectedDonor.basicInfo.eyeColor}</TableCell>
                              </TableRow>
                            </>
                          )}
                          <TableRow>
                            <TableCell component="th" scope="row">Blood Type</TableCell>
                            <TableCell>{selectedDonor.basicInfo.bloodType}</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Box>
                  
                  {selectedDonor.type !== 'embryo' && (
                    <Box mt={3}>
                      <Typography variant="h6" gutterBottom>Education & Occupation</Typography>
                      <TableContainer component={Paper} variant="outlined">
                        <Table size="small">
                          <TableBody>
                            <TableRow>
                              <TableCell component="th" scope="row" sx={{ width: '40%' }}>Education</TableCell>
                              <TableCell>{selectedDonor.education}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell component="th" scope="row">Occupation</TableCell>
                              <TableCell>{selectedDonor.occupation}</TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Box>
                  )}
                  
                  <Box mt={3}>
                    <Typography variant="h6" gutterBottom>Medical Information</Typography>
                    <TableContainer component={Paper} variant="outlined">
                      <Table size="small">
                        <TableBody>
                          <TableRow>
                            <TableCell component="th" scope="row" sx={{ width: '40%' }}>Genetic Screening</TableCell>
                            <TableCell>{selectedDonor.medicalHistory.geneticScreening ? 'Completed' : 'Not Completed'}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell component="th" scope="row">Genetic Conditions</TableCell>
                            <TableCell>
                              {selectedDonor.medicalHistory.geneticConditions.length > 0 
                                ? selectedDonor.medicalHistory.geneticConditions.join(', ') 
                                : 'None detected'}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell component="th" scope="row">Family History: Cancer</TableCell>
                            <TableCell>{selectedDonor.medicalHistory.familyHistory.cancer ? 'Yes' : 'No'}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell component="th" scope="row">Family History: Diabetes</TableCell>
                            <TableCell>{selectedDonor.medicalHistory.familyHistory.diabetes ? 'Yes' : 'No'}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell component="th" scope="row">Family History: Heart Disease</TableCell>
                            <TableCell>{selectedDonor.medicalHistory.familyHistory.heartDisease ? 'Yes' : 'No'}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell component="th" scope="row">Family History: Mental Health</TableCell>
                            <TableCell>{selectedDonor.medicalHistory.familyHistory.mentalHealth ? 'Yes' : 'No'}</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Box>
                  
                  {selectedDonor.additionalInfo && (
                    <Box mt={3}>
                      <Typography variant="h6" gutterBottom>Additional Information</Typography>
                      <Paper variant="outlined" sx={{ p: 2 }}>
                        <Typography variant="body1">{selectedDonor.additionalInfo}</Typography>
                      </Paper>
                    </Box>
                  )}
                  
                  <Box mt={3}>
                    <Typography variant="body2" color="text.secondary">
                      Note: This is a simplified donor profile. In a real application, more detailed information would be available upon request and after appropriate screening and agreements.
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDonorDialog}>Close</Button>
              <Button variant="contained" color="primary">
                Contact Clinic About This Donor
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Container>
  );
};

export default DonorMatching;
