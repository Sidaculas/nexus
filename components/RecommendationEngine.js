import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  Button, 
  Divider,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  CircularProgress,
  Paper
} from '@mui/material';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import PersonIcon from '@mui/icons-material/Person';
import GavelIcon from '@mui/icons-material/Gavel';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

// Mock data for demonstration
const mockRecommendations = {
  clinics: [
    {
      id: 'clinic-001',
      name: 'Fertility Center of Cancun',
      location: 'Cancun, Mexico',
      matchScore: 92,
      costRange: {
        currency: 'USD',
        min: 6000,
        max: 8000
      },
      successRate: 62,
      services: ['IVF', 'Egg Donation', 'Embryo Freezing'],
      languages: ['English', 'Spanish'],
      description: 'Specializing in affordable IVF and egg donation with high success rates and English-speaking staff.'
    },
    {
      id: 'clinic-002',
      name: 'Prague Fertility Center',
      location: 'Prague, Czech Republic',
      matchScore: 88,
      costRange: {
        currency: 'USD',
        min: 4500,
        max: 6500
      },
      successRate: 58,
      services: ['IVF', 'Egg Donation', 'PGT-A'],
      languages: ['English', 'Czech', 'German'],
      description: 'European clinic with comprehensive donor programs and modern facilities at competitive prices.'
    },
    {
      id: 'clinic-003',
      name: 'Bangkok IVF Center',
      location: 'Bangkok, Thailand',
      matchScore: 85,
      costRange: {
        currency: 'USD',
        min: 4000,
        max: 6000
      },
      successRate: 55,
      services: ['IVF', 'Egg Donation', 'Gender Selection'],
      languages: ['English', 'Thai'],
      description: 'World-class medical tourism destination with comprehensive fertility packages and travel support.'
    }
  ],
  donors: [
    {
      id: 'donor-001',
      type: 'egg',
      donorId: 'EC-2458',
      clinicId: 'clinic-001',
      clinicName: 'Fertility Center of Cancun',
      matchScore: 95,
      basicInfo: {
        age: 28,
        ethnicity: 'Caucasian'
      },
      cost: 8000,
      currency: 'USD'
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
        ethnicity: 'Hispanic'
      },
      cost: 7500,
      currency: 'USD'
    }
  ],
  legalGuidance: {
    homeCountry: {
      name: 'United States',
      fertilityLaws: 'Varies by state/region',
      returnConsiderations: 'Check local birth certificate and citizenship requirements'
    },
    treatmentCountries: [
      {
        name: 'Mexico',
        fertilityLaws: 'Permissive IVF regulations with minimal restrictions',
        documentRequirements: ['Passport', 'Marriage Certificate (if applicable)'],
        legalConsiderations: 'No federal laws specifically regulating IVF'
      },
      {
        name: 'Czech Republic',
        fertilityLaws: 'Well-regulated with age limits for recipients and donors',
        documentRequirements: ['Passport', 'Marriage Certificate (required for couples)'],
        legalConsiderations: 'Anonymous donation only, treatment limited to heterosexual couples or single women'
      }
    ]
  },
  resources: [
    {
      id: 'resource-001',
      title: 'Understanding the IVF Process',
      type: 'article',
      tags: ['IVF', 'beginner', 'treatment'],
      relevanceScore: 95,
      url: '/resources/understanding-ivf-process'
    },
    {
      id: 'resource-002',
      title: 'Traveling for Fertility Treatment: What to Expect',
      type: 'guide',
      tags: ['travel', 'international', 'preparation'],
      relevanceScore: 90,
      url: '/resources/traveling-for-fertility-treatment'
    },
    {
      id: 'resource-003',
      title: 'Emotional Support During Your Fertility Journey',
      type: 'video',
      tags: ['emotional', 'support', 'mental health'],
      relevanceScore: 85,
      url: '/resources/emotional-support-fertility-journey'
    }
  ],
  travelPlans: [
    {
      clinicId: 'clinic-001',
      destination: 'Cancun, Mexico',
      travelDetails: {
        nearestAirport: 'Cancun International Airport (CUN)',
        flightEstimate: {
          from: 'United States',
          cost: '$350-$650',
          duration: '3-5 hours'
        },
        accommodation: {
          options: ['Hotel Zone', 'Downtown', 'Clinic Partner Hotels'],
          costRange: '$80-$250 per night'
        },
        localTransportation: ['Taxi', 'Shuttle', 'Rental Car'],
        visaRequirements: 'Tourist visa not required for US citizens for stays under 180 days'
      },
      treatmentTimeline: {
        initialConsultation: '1 day',
        treatmentDuration: '12-14 days',
        recommendedStay: '2-3 weeks'
      }
    },
    {
      clinicId: 'clinic-002',
      destination: 'Prague, Czech Republic',
      travelDetails: {
        nearestAirport: 'Václav Havel Airport Prague (PRG)',
        flightEstimate: {
          from: 'United States',
          cost: '$700-$1,200',
          duration: '10-14 hours'
        },
        accommodation: {
          options: ['City Center', 'Clinic Apartments', 'Hotels'],
          costRange: '$60-$150 per night'
        },
        localTransportation: ['Metro', 'Tram', 'Taxi'],
        visaRequirements: 'Schengen visa not required for US citizens for stays under 90 days'
      },
      treatmentTimeline: {
        initialConsultation: '1 day',
        treatmentDuration: '14-18 days',
        recommendedStay: '3 weeks'
      }
    }
  ]
};

const RecommendationEngine = () => {
  const [loading, setLoading] = useState(true);
  const [recommendations, setRecommendations] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  
  useEffect(() => {
    // In a real app, this would fetch from API based on user's quiz results
    setTimeout(() => {
      setRecommendations(mockRecommendations);
      setLoading(false);
    }, 1500);
  }, []);
  
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  
  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh" flexDirection="column">
          <CircularProgress size={60} sx={{ mb: 3 }} />
          <Typography variant="h5" gutterBottom>
            Generating Your Personalized Recommendations
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Our AI is analyzing your preferences to find the best matches for your fertility journey
          </Typography>
        </Box>
      </Container>
    );
  }
  
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Your Personalized Recommendations
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Based on your preferences and needs, we've created a comprehensive plan to help you on your fertility journey.
      </Typography>
      
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={activeTab} onChange={handleTabChange} aria-label="recommendation tabs">
          <Tab label="Overview" />
          <Tab label="Clinics" />
          <Tab label="Donors" />
          <Tab label="Legal Guidance" />
          <Tab label="Travel Planning" />
          <Tab label="Resources" />
        </Tabs>
      </Box>
      
      {/* Overview Tab */}
      {activeTab === 0 && (
        <Box>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    Your Fertility Journey Plan
                  </Typography>
                  <Typography variant="body1" paragraph>
                    We've analyzed your preferences and created a personalized plan to help you achieve your fertility goals. Here's a summary of our recommendations:
                  </Typography>
                  
                  <Grid container spacing={3} sx={{ mt: 1 }}>
                    <Grid item xs={12} md={4}>
                      <Paper elevation={0} sx={{ p: 2, bgcolor: '#f5f5f5', height: '100%' }}>
                        <Box display="flex" alignItems="center" mb={1}>
                          <LocalHospitalIcon color="primary" sx={{ mr: 1 }} />
                          <Typography variant="h6">Top Clinic Match</Typography>
                        </Box>
                        <Typography variant="body1" fontWeight="bold">
                          {recommendations.clinics[0].name}
                        </Typography>
                        <Typography variant="body2">
                          {recommendations.clinics[0].location}
                        </Typography>
                        <Chip 
                          label={`${recommendations.clinics[0].matchScore}% Match`} 
                          color="primary" 
                          size="small" 
                          sx={{ mt: 1 }}
                        />
                        <Button 
                          variant="text" 
                          color="primary" 
                          endIcon={<ArrowForwardIcon />}
                          sx={{ mt: 1 }}
                        >
                          View Details
                        </Button>
                      </Paper>
                    </Grid>
                    
                    {recommendations.donors.length > 0 && (
                      <Grid item xs={12} md={4}>
                        <Paper elevation={0} sx={{ p: 2, bgcolor: '#f5f5f5', height: '100%' }}>
                          <Box display="flex" alignItems="center" mb={1}>
                            <PersonIcon color="primary" sx={{ mr: 1 }} />
                            <Typography variant="h6">Top Donor Match</Typography>
                          </Box>
                          <Typography variant="body1" fontWeight="bold">
                            Donor {recommendations.donors[0].donorId}
                          </Typography>
                          <Typography variant="body2">
                            {recommendations.donors[0].basicInfo.ethnicity}, Age {recommendations.donors[0].basicInfo.age}
                          </Typography>
                          <Chip 
                            label={`${recommendations.donors[0].matchScore}% Match`} 
                            color="primary" 
                            size="small" 
                            sx={{ mt: 1 }}
                          />
                          <Button 
                            variant="text" 
                            color="primary" 
                            endIcon={<ArrowForwardIcon />}
                            sx={{ mt: 1 }}
                          >
                            View Details
                          </Button>
                        </Paper>
                      </Grid>
                    )}
                    
                    <Grid item xs={12} md={4}>
                      <Paper elevation={0} sx={{ p: 2, bgcolor: '#f5f5f5', height: '100%' }}>
                        <Box display="flex" alignItems="center" mb={1}>
                          <GavelIcon color="primary" sx={{ mr: 1 }} />
                          <Typography variant="h6">Legal Considerations</Typography>
                        </Box>
                        <Typography variant="body1" fontWeight="bold">
                          {recommendations.legalGuidance.treatmentCountries[0].name}
                        </Typography>
                        <Typography variant="body2">
                          {recommendations.legalGuidance.treatmentCountries[0].fertilityLaws}
                        </Typography>
                        <Button 
                          variant="text" 
                          color="primary" 
                          endIcon={<ArrowForwardIcon />}
                          sx={{ mt: 1 }}
                        >
                          View Legal Guide
                        </Button>
                      </Paper>
                    </Grid>
                  </Grid>
                  
                  <Box mt={4}>
                    <Typography variant="h6" gutterBottom>
                      Next Steps
                    </Typography>
                    <List>
                      <ListItem>
                        <ListItemIcon>
                          <CheckCircleIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText 
                          primary="Explore your matched clinics and donors" 
                          secondary="Review detailed profiles and compare options"
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <CheckCircleIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText 
                          primary="Review legal considerations" 
                          secondary="Understand the legal requirements for your chosen destination"
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <CheckCircleIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText 
                          primary="Explore travel planning options" 
                          secondary="Review travel logistics and accommodation options"
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <CheckCircleIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText 
                          primary="Schedule a consultation" 
                          secondary="Connect with your preferred clinic to discuss next steps"
                        />
                      </ListItem>
                    </List>
                  </Box>
                  
                  <Box mt={3} textAlign="center">
                    <Button 
                      variant="contained" 
                      color="primary" 
                      size="large"
                    >
                      Schedule a Consultation
                    </Button>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      Need help? Chat with our AI Fertility Coach for personalized guidance
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      )}
      
      {/* Clinics Tab */}
      {activeTab === 1 && (
        <Box>
          <Typography variant="h5" gutterBottom>
            Recommended Clinics
          </Typography>
          <Typography variant="body1" paragraph>
            Based on your preferences, we've identified these clinics as your best matches.
          </Typography>
          
          <Grid container spacing={3}>
            {recommendations.clinics.map((clinic, index) => (
              <Grid item xs={12} key={clinic.id}>
                <Card>
                  <CardContent>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={8}>
                        <Box display="flex" alignItems="center">
                          <Typography variant="h6">{index + 1}. {clinic.name}</Typography>
                          <Chip 
                            label={`${clinic.matchScore}% Match`} 
                            color="primary" 
                            size="small" 
                            sx={{ ml: 2 }}
                          />
                        </Box>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          {clinic.location}
                        </Typography>
                        <Typography variant="body1" paragraph>
                          {clinic.description}
                        </Typography>
                        <Box display="flex" flexWrap="wrap" mb={2}>
                          {clinic.services.map((service) => (
                            <Chip 
                              key={service} 
                              label={service} 
                              size="small" 
                              sx={{ mr: 0.5, mb: 0.5 }}
                            />
                          ))}
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <Box sx={{ bgcolor: '#f5f5f5', p: 2, borderRadius: 1 }}>
                          <Typography variant="subtitle2" gutterBottom>
                            Cost Range:
                          </Typography>
                          <Typography variant="h6" color="primary">
                            ${clinic.costRange.min.toLocaleString()} - ${clinic.costRange.max.toLocaleString()}
                          </Typography>
                          <Divider sx={{ my: 1 }} />
                          <Typography variant="subtitle2" gutterBottom>
                            Success Rate:
                          </Typography>
                          <Typography variant="h6" color="primary">
                            {clinic.successRate}%
                          </Typography>
                          <Divider sx={{ my: 1 }} />
                          <Typography variant="subtitle2" gutterBottom>
                            Languages:
                          </Typography>
                          <Typography variant="body2">
                            {clinic.languages.join(', ')}
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                    <Box display="flex" justifyContent="flex-end" mt={2}>
                      <Button 
                        variant="outlined" 
                        color="primary" 
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
                </Card>
              </Grid>
            ))}
          </Grid>
          
          <Box textAlign="center" mt={4}>
            <Button 
              variant="outlined" 
              color="primary"
            >
              View All Clinic Matches
            </Button>
          </Box>
        </Box>
      )}
      
      {/* Donors Tab */}
      {activeTab === 2 && (
        <Box>
          <Typography variant="h5" gutterBottom>
            Recommended Donors
          </Typography>
          <Typography variant="body1" paragraph>
            These donors closely match your preferences and are available at your matched clinics.
          </Typography>
          
          <Grid container spacing={3}>
            {recommendations.donors.map((donor, index) => (
              <Grid item xs={12} sm={6} key={donor.id}>
                <Card>
                  <CardContent>
                    <Box display="flex" alignItems="center" mb={1}>
                      <Typography variant="h6">Donor {donor.donorId}</Typography>
                      <Chip 
                        label={`${donor.matchScore}% Match`} 
                        color="primary" 
                        size="small" 
                        sx={{ ml: 2 }}
                      />
                    </Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Available at: {donor.clinicName}
                    </Typography>
                    
                    <Divider sx={{ my: 1.5 }} />
                    
                    <Grid container spacing={1}>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">Type:</Typography>
                        <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>{donor.type} Donor</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">Ethnicity:</Typography>
                        <Typography variant="body2">{donor.basicInfo.ethnicity}</Typography>
                      </Grid>
                      {donor.type !== 'embryo' && (
                        <Grid item xs={6}>
                          <Typography variant="body2" color="text.secondary">Age:</Typography>
                          <Typography variant="body2">{donor.basicInfo.age}</Typography>
                        </Grid>
                      )}
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">Cost:</Typography>
                        <Typography variant="body2">${donor.cost.toLocaleString()} {donor.currency}</Typography>
                      </Grid>
                    </Grid>
                    
                    <Box display="flex" justifyContent="flex-end" mt={2}>
                      <Button 
                        variant="contained" 
                        color="primary"
                      >
                        View Full Profile
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          
          <Box textAlign="center" mt={4}>
            <Button 
              variant="outlined" 
              color="primary"
            >
              View All Donor Matches
            </Button>
          </Box>
        </Box>
      )}
      
      {/* Legal Guidance Tab */}
      {activeTab === 3 && (
        <Box>
          <Typography variant="h5" gutterBottom>
            Legal Guidance
          </Typography>
          <Typography variant="body1" paragraph>
            Understanding the legal aspects of fertility treatment across different regions is crucial for a smooth journey.
          </Typography>
          
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Your Home Country: {recommendations.legalGuidance.homeCountry.name}
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>Fertility Laws:</strong> {recommendations.legalGuidance.homeCountry.fertilityLaws}
              </Typography>
              <Typography variant="body1">
                <strong>Return Considerations:</strong> {recommendations.legalGuidance.homeCountry.returnConsiderations}
              </Typography>
            </CardContent>
          </Card>
          
          <Typography variant="h6" gutterBottom>
            Treatment Destination Legal Considerations
          </Typography>
          
          <Grid container spacing={3}>
            {recommendations.legalGuidance.treatmentCountries.map((country) => (
              <Grid item xs={12} md={6} key={country.name}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {country.name}
                    </Typography>
                    <Typography variant="body2" paragraph>
                      <strong>Fertility Laws:</strong> {country.fertilityLaws}
                    </Typography>
                    <Typography variant="body2" paragraph>
                      <strong>Legal Considerations:</strong> {country.legalConsiderations}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      <strong>Required Documents:</strong>
                    </Typography>
                    <List dense>
                      {country.documentRequirements.map((doc, index) => (
                        <ListItem key={index}>
                          <ListItemIcon sx={{ minWidth: 30 }}>
                            <CheckCircleIcon fontSize="small" color="primary" />
                          </ListItemIcon>
                          <ListItemText primary={doc} />
                        </ListItem>
                      ))}
                    </List>
                    <Button 
                      variant="outlined" 
                      color="primary" 
                      sx={{ mt: 2 }}
                    >
                      Detailed Legal Guide
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          
          <Box mt={4} p={3} bgcolor="#f5f5f5" borderRadius={1}>
            <Typography variant="body2" color="text.secondary">
              <strong>Disclaimer:</strong> This information is provided as general guidance only and should not be considered legal advice. Laws and regulations may change, and individual circumstances vary. We recommend consulting with a legal professional specializing in reproductive law for your specific situation.
            </Typography>
          </Box>
        </Box>
      )}
      
      {/* Travel Planning Tab */}
      {activeTab === 4 && (
        <Box>
          <Typography variant="h5" gutterBottom>
            Travel Planning
          </Typography>
          <Typography variant="body1" paragraph>
            We've prepared travel information for your top clinic matches to help you plan your fertility journey.
          </Typography>
          
          {recommendations.travelPlans.map((plan) => (
            <Card key={plan.clinicId} sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {plan.destination}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  For treatment at: {recommendations.clinics.find(c => c.id === plan.clinicId)?.name}
                </Typography>
                
                <Grid container spacing={3} sx={{ mt: 1 }}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle1" gutterBottom>
                      Travel Details
                    </Typography>
                    <List dense>
                      <ListItem>
                        <ListItemIcon>
                          <TravelExploreIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText 
                          primary="Nearest Airport" 
                          secondary={plan.travelDetails.nearestAirport} 
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <TravelExploreIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText 
                          primary="Flight Estimate" 
                          secondary={`${plan.travelDetails.flightEstimate.cost} (${plan.travelDetails.flightEstimate.duration})`} 
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <TravelExploreIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText 
                          primary="Accommodation Options" 
                          secondary={`${plan.travelDetails.accommodation.options.join(', ')} (${plan.travelDetails.accommodation.costRange})`} 
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <TravelExploreIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText 
                          primary="Local Transportation" 
                          secondary={plan.travelDetails.localTransportation.join(', ')} 
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <TravelExploreIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText 
                          primary="Visa Requirements" 
                          secondary={plan.travelDetails.visaRequirements} 
                        />
                      </ListItem>
                    </List>
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle1" gutterBottom>
                      Treatment Timeline
                    </Typography>
                    <Box p={2} bgcolor="#f5f5f5" borderRadius={1}>
                      <Typography variant="body2" gutterBottom>
                        <strong>Initial Consultation:</strong> {plan.treatmentTimeline.initialConsultation}
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        <strong>Treatment Duration:</strong> {plan.treatmentTimeline.treatmentDuration}
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        <strong>Recommended Stay:</strong> {plan.treatmentTimeline.recommendedStay}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                        Note: Timeline may vary based on individual treatment plans and response to medications.
                      </Typography>
                    </Box>
                    
                    <Button 
                      variant="contained" 
                      color="primary" 
                      sx={{ mt: 2 }}
                      fullWidth
                    >
                      Get Travel Quote
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          ))}
          
          <Box textAlign="center" mt={3}>
            <Button 
              variant="outlined" 
              color="primary"
            >
              Speak with a Fertility Travel Specialist
            </Button>
          </Box>
        </Box>
      )}
      
      {/* Resources Tab */}
      {activeTab === 5 && (
        <Box>
          <Typography variant="h5" gutterBottom>
            Recommended Resources
          </Typography>
          <Typography variant="body1" paragraph>
            We've curated these resources to help you on your fertility journey.
          </Typography>
          
          <Grid container spacing={3}>
            {recommendations.resources.map((resource) => (
              <Grid item xs={12} md={4} key={resource.id}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box display="flex" alignItems="flex-start" mb={2}>
                      <MenuBookIcon color="primary" sx={{ mr: 1, mt: 0.5 }} />
                      <Typography variant="h6">{resource.title}</Typography>
                    </Box>
                    <Chip 
                      label={resource.type} 
                      size="small" 
                      color="primary" 
                      variant="outlined"
                      sx={{ mb: 2 }}
                    />
                    <Box display="flex" flexWrap="wrap" mb={2}>
                      {resource.tags.map((tag) => (
                        <Chip 
                          key={tag} 
                          label={tag} 
                          size="small" 
                          sx={{ mr: 0.5, mb: 0.5 }}
                        />
                      ))}
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      Relevance Score: {resource.relevanceScore}%
                    </Typography>
                  </CardContent>
                  <Box p={2} pt={0}>
                    <Button 
                      variant="outlined" 
                      color="primary" 
                      fullWidth
                    >
                      View Resource
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
          
          <Box textAlign="center" mt={4}>
            <Button 
              variant="outlined" 
              color="primary"
            >
              Browse Resource Library
            </Button>
          </Box>
        </Box>
      )}
      
      <Box textAlign="center" mt={6} p={3} bgcolor="#f5f5f5" borderRadius={2}>
        <Typography variant="h6" gutterBottom>
          Need personalized guidance?
        </Typography>
        <Typography variant="body1" paragraph>
          Our AI Fertility Coach is available 24/7 to answer your questions and provide support.
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          size="large"
        >
          Chat with Fertility Coach
        </Button>
      </Box>
    </Container>
  );
};

export default RecommendationEngine;
