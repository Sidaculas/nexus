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
  Paper,
  TextField,
  Autocomplete,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Alert,
  AlertTitle
} from '@mui/material';
import GavelIcon from '@mui/icons-material/Gavel';
import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import SearchIcon from '@mui/icons-material/Search';
import PublicIcon from '@mui/icons-material/Public';

// Mock data for demonstration
const mockCountries = [
  'United States', 'Canada', 'Mexico', 'United Kingdom', 'Spain', 'Czech Republic', 
  'Greece', 'Ukraine', 'Russia', 'Thailand', 'Malaysia', 'Australia'
];

const mockLegalGuidance = {
  country: 'Mexico',
  region: '',
  fertilityLaws: {
    ivfRegulations: 'IVF is legal and widely available with minimal restrictions. There are no federal laws specifically regulating IVF, allowing clinics to operate with significant autonomy.',
    donorEggRegulations: 'Egg donation is legal and available. Both anonymous and known donation are permitted.',
    donorSpermRegulations: 'Sperm donation is legal and available. Both anonymous and known donation are permitted.',
    embryoDonationRegulations: 'Embryo donation is legal and available with minimal restrictions.',
    surrogacyRegulations: 'Surrogacy is legal in most states, though regulations vary by state. Commercial surrogacy is permitted in many regions.',
    singleParentRegulations: 'Single women can access fertility treatments without restrictions. Single men may face more challenges depending on the clinic.',
    lgbtqRegulations: 'LGBTQ+ individuals and couples can access fertility treatments, though some clinics may have their own policies.',
    ageRestrictions: 'No federal age restrictions, though individual clinics may set their own limits.'
  },
  legalRequirements: {
    documentationNeeded: [
      'Valid passport',
      'Marriage certificate (if applicable)',
      'Birth certificate',
      'Medical history documentation'
    ],
    parentalRights: 'The birth mother is legally recognized as the mother. For donor eggs or surrogacy, additional legal steps may be required to establish parental rights.',
    birthCertificateProcess: 'Birth certificates are issued by the civil registry office in the state where the birth occurs. Foreign parents will be listed on the birth certificate.',
    citizenshipConsiderations: 'Children born in Mexico to foreign parents do not automatically receive Mexican citizenship unless one parent is a Mexican citizen or legal resident.'
  },
  crossBorderConsiderations: {
    importExportRestrictions: 'Importing and exporting of gametes (eggs, sperm) and embryos is permitted with proper documentation and medical oversight.',
    internationalRecognition: 'Legal parenthood established in Mexico may require additional legal processes for recognition in the home country.',
    returnHomeConsiderations: 'Parents should consult with immigration attorneys in their home country before beginning treatment to understand the process for bringing a child born in Mexico back to their home country.'
  },
  insuranceAndFinancial: {
    insuranceCoverage: 'International insurance typically does not cover fertility treatments in Mexico. Some Mexican private insurance may offer limited coverage.',
    publicFunding: 'No public funding is available for foreign patients.',
    taxConsiderations: 'Medical expenses, including fertility treatments, may be tax-deductible in some countries. Consult with a tax professional in your home country.'
  },
  legalResources: {
    recommendedLegalServices: [
      'International Fertility Law Group',
      'Mexican Association of Reproductive Law',
      'Global Fertility Legal Network'
    ],
    governmentWebsites: [
      'https://www.gob.mx/salud (Mexican Ministry of Health)',
      'https://www.gob.mx/segob (Mexican Ministry of the Interior)'
    ],
    supportOrganizations: [
      'Fertility Mexico Support Network',
      'International Intended Parents Association',
      'Cross-Border Reproductive Care Network'
    ]
  }
};

const mockComparisonData = {
  homeCountry: {
    country: 'United States',
    fertilityLaws: {
      ivfRegulations: 'IVF is legal and widely available, but regulations vary by state. There is no federal oversight specific to IVF.',
      donorEggRegulations: 'Egg donation is legal in all states. Both anonymous and known donation are permitted.',
      donorSpermRegulations: 'Sperm donation is legal in all states. Both anonymous and known donation are permitted.',
      embryoDonationRegulations: 'Embryo donation is legal but regulations vary by state.',
      surrogacyRegulations: 'Surrogacy laws vary significantly by state. Some states are surrogacy-friendly with established laws, while others prohibit or restrict surrogacy arrangements.',
      singleParentRegulations: 'Single individuals can generally access fertility treatments, though policies may vary by clinic.',
      lgbtqRegulations: 'LGBTQ+ individuals and couples can generally access fertility treatments, though policies may vary by clinic and state.',
      ageRestrictions: 'No federal age restrictions, though individual clinics may set their own limits.'
    },
    legalRequirements: {
      documentationNeeded: [
        'Valid ID',
        'Insurance information',
        'Medical history documentation'
      ],
      parentalRights: 'Varies by state. Many states have established processes for determining legal parenthood in cases involving assisted reproduction.',
      birthCertificateProcess: 'Birth certificates are issued by the state where the birth occurs. Processes for listing non-biological parents may vary by state.',
      citizenshipConsiderations: 'Children born to U.S. citizens abroad may be eligible for U.S. citizenship, but specific requirements must be met.'
    }
  },
  destinationCountry: mockLegalGuidance,
  crossBorderConsiderations: mockLegalGuidance.crossBorderConsiderations,
  returnHomeConsiderations: {
    parentalRights: 'Varies by state. Many states have established processes for determining legal parenthood in cases involving assisted reproduction.',
    birthCertificateProcess: 'Birth certificates issued in Mexico will need to be authenticated for use in the United States, typically through an apostille process.',
    citizenshipConsiderations: 'Children born abroad to U.S. citizens may acquire U.S. citizenship at birth if certain conditions are met. Consult with immigration attorney.'
  }
};

const LegalGuidanceSystem = () => {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [legalGuidance, setLegalGuidance] = useState(null);
  
  // Comparison state
  const [homeCountry, setHomeCountry] = useState('');
  const [destinationCountry, setDestinationCountry] = useState('');
  const [comparisonData, setComparisonData] = useState(null);
  const [showComparison, setShowComparison] = useState(false);
  
  // Search state
  const [treatmentType, setTreatmentType] = useState('');
  const [singleParent, setSingleParent] = useState('');
  const [lgbtq, setLgbtq] = useState('');
  const [ageAbove45, setAgeAbove45] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  
  const handleCountrySelect = (event, value) => {
    setSelectedCountry(value);
    if (value) {
      // In a real app, this would fetch from API
      setLoading(true);
      setTimeout(() => {
        setLegalGuidance(mockLegalGuidance);
        setLoading(false);
      }, 1000);
    } else {
      setLegalGuidance(null);
    }
  };
  
  const handleCompare = () => {
    if (homeCountry && destinationCountry) {
      // In a real app, this would fetch from API
      setLoading(true);
      setTimeout(() => {
        setComparisonData(mockComparisonData);
        setShowComparison(true);
        setLoading(false);
      }, 1500);
    }
  };
  
  const handleSearch = () => {
    // In a real app, this would fetch from API
    setLoading(true);
    setTimeout(() => {
      // Mock search results
      setSearchResults([
        {
          country: 'Mexico',
          region: '',
          fertilityLaws: {
            ivfRegulations: 'Legal with minimal restrictions',
            donorEggRegulations: 'Legal, both anonymous and known',
            surrogacyRegulations: 'Legal in most states'
          }
        },
        {
          country: 'Spain',
          region: '',
          fertilityLaws: {
            ivfRegulations: 'Legal and regulated',
            donorEggRegulations: 'Legal, anonymous only',
            surrogacyRegulations: 'Prohibited'
          }
        },
        {
          country: 'Greece',
          region: '',
          fertilityLaws: {
            ivfRegulations: 'Legal and regulated',
            donorEggRegulations: 'Legal, anonymous only',
            surrogacyRegulations: 'Legal with restrictions'
          }
        }
      ]);
      setLoading(false);
    }, 1500);
  };
  
  const renderLegalStatus = (status) => {
    if (!status) return null;
    
    const lowerStatus = status.toLowerCase();
    
    if (lowerStatus.includes('prohibited') || lowerStatus.includes('not allowed') || lowerStatus.includes('illegal')) {
      return (
        <Chip 
          icon={<CancelIcon />} 
          label="Prohibited" 
          color="error" 
          size="small" 
        />
      );
    } else if (lowerStatus.includes('restrictions') || lowerStatus.includes('limited')) {
      return (
        <Chip 
          icon={<WarningIcon />} 
          label="Restricted" 
          color="warning" 
          size="small" 
        />
      );
    } else if (lowerStatus.includes('legal')) {
      return (
        <Chip 
          icon={<CheckCircleIcon />} 
          label="Legal" 
          color="success" 
          size="small" 
        />
      );
    }
    
    return null;
  };
  
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Legal Guidance System
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Navigate the complex legal landscape of fertility treatments across different countries.
      </Typography>
      
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={activeTab} onChange={handleTabChange} aria-label="legal guidance tabs">
          <Tab label="Country Guide" />
          <Tab label="Legal Comparison" />
          <Tab label="Search by Requirements" />
        </Tabs>
      </Box>
      
      {/* Country Guide Tab */}
      {activeTab === 0 && (
        <Box>
          <Card sx={{ mb: 4 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Select a Country
              </Typography>
              <Autocomplete
                options={mockCountries}
                value={selectedCountry}
                onChange={handleCountrySelect}
                renderInput={(params) => (
                  <TextField 
                    {...params} 
                    label="Country" 
                    variant="outlined" 
                    placeholder="Search for a country"
                    fullWidth
                  />
                )}
              />
            </CardContent>
          </Card>
          
          {loading && (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="300px">
              <CircularProgress />
            </Box>
          )}
          
          {!loading && legalGuidance && (
            <Box>
              <Box mb={3}>
                <Typography variant="h5" gutterBottom>
                  {legalGuidance.country} Fertility Law Guide
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Last updated: {new Date().toLocaleDateString()}
                </Typography>
              </Box>
              
              <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                  <Accordion defaultExpanded>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography variant="h6">Fertility Treatment Regulations</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <List>
                        <ListItem>
                          <ListItemIcon>
                            <GavelIcon color="primary" />
                          </ListItemIcon>
                          <ListItemText 
                            primary="IVF Regulations" 
                            secondary={legalGuidance.fertilityLaws.ivfRegulations}
                          />
                          {renderLegalStatus(legalGuidance.fertilityLaws.ivfRegulations)}
                        </ListItem>
                        <Divider component="li" />
                        <ListItem>
                          <ListItemIcon>
                            <GavelIcon color="primary" />
                          </ListItemIcon>
                          <ListItemText 
                            primary="Egg Donation Regulations" 
                            secondary={legalGuidance.fertilityLaws.donorEggRegulations}
                          />
                          {renderLegalStatus(legalGuidance.fertilityLaws.donorEggRegulations)}
                        </ListItem>
                        <Divider component="li" />
                        <ListItem>
                          <ListItemIcon>
                            <GavelIcon color="primary" />
                          </ListItemIcon>
                          <ListItemText 
                            primary="Sperm Donation Regulations" 
                            secondary={legalGuidance.fertilityLaws.donorSpermRegulations}
                          />
                          {renderLegalStatus(legalGuidance.fertilityLaws.donorSpermRegulations)}
                        </ListItem>
                        <Divider component="li" />
                        <ListItem>
                          <ListItemIcon>
                            <GavelIcon color="primary" />
                          </ListItemIcon>
                          <ListItemText 
                            primary="Embryo Donation Regulations" 
                            secondary={legalGuidance.fertilityLaws.embryoDonationRegulations}
                          />
                          {renderLegalStatus(legalGuidance.fertilityLaws.embryoDonationRegulations)}
                        </ListItem>
                        <Divider component="li" />
                        <ListItem>
                          <ListItemIcon>
                            <GavelIcon color="primary" />
                          </ListItemIcon>
                          <ListItemText 
                            primary="Surrogacy Regulations" 
                            secondary={legalGuidance.fertilityLaws.surrogacyRegulations}
                          />
                          {renderLegalStatus(legalGuidance.fertilityLaws.surrogacyRegulations)}
                        </ListItem>
                      </List>
                    </AccordionDetails>
                  </Accordion>
                  
                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography variant="h6">Eligibility Requirements</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <List>
                        <ListItem>
                          <ListItemIcon>
                            <GavelIcon color="primary" />
                          </ListItemIcon>
                          <ListItemText 
                            primary="Single Parent Regulations" 
                            secondary={legalGuidance.fertilityLaws.singleParentRegulations}
                          />
                          {renderLegalStatus(legalGuidance.fertilityLaws.singleParentRegulations)}
                        </ListItem>
                        <Divider component="li" />
                        <ListItem>
                          <ListItemIcon>
                            <GavelIcon color="primary" />
                          </ListItemIcon>
                          <ListItemText 
                            primary="LGBTQ+ Regulations" 
                            secondary={legalGuidance.fertilityLaws.lgbtqRegulations}
                          />
                          {renderLegalStatus(legalGuidance.fertilityLaws.lgbtqRegulations)}
                        </ListItem>
                        <Divider component="li" />
                        <ListItem>
                          <ListItemIcon>
                            <GavelIcon color="primary" />
                          </ListItemIcon>
                          <ListItemText 
                            primary="Age Restrictions" 
                            secondary={legalGuidance.fertilityLaws.ageRestrictions}
                          />
                        </ListItem>
                      </List>
                    </AccordionDetails>
                  </Accordion>
                  
                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography variant="h6">Legal Requirements</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <List>
                        <ListItem>
                          <ListItemIcon>
                            <GavelIcon color="primary" />
                          </ListItemIcon>
                          <ListItemText 
                            primary="Required Documentation" 
                            secondary={
                              <Box component="ul" sx={{ pl: 2, mt: 0 }}>
                                {legalGuidance.legalRequirements.documentationNeeded.map((doc, index) => (
                                  <li key={index}>{doc}</li>
                                ))}
                              </Box>
                            }
                          />
                        </ListItem>
                        <Divider component="li" />
                        <ListItem>
                          <ListItemIcon>
                            <GavelIcon color="primary" />
                          </ListItemIcon>
                          <ListItemText 
                            primary="Parental Rights" 
                            secondary={legalGuidance.legalRequirements.parentalRights}
                          />
                        </ListItem>
                        <Divider component="li" />
                        <ListItem>
                          <ListItemIcon>
                            <GavelIcon color="primary" />
                          </ListItemIcon>
                          <ListItemText 
                            primary="Birth Certificate Process" 
                            secondary={legalGuidance.legalRequirements.birthCertificateProcess}
                          />
                        </ListItem>
                        <Divider component="li" />
                        <ListItem>
                          <ListItemIcon>
                            <GavelIcon color="primary" />
                          </ListItemIcon>
                          <ListItemText 
                            primary="Citizenship Considerations" 
                            secondary={legalGuidance.legalRequirements.citizenshipConsiderations}
                          />
                        </ListItem>
                      </List>
                    </AccordionDetails>
                  </Accordion>
                  
                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography variant="h6">Cross-Border Considerations</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <List>
                        <ListItem>
                          <ListItemIcon>
                            <GavelIcon color="primary" />
                          </ListItemIcon>
                          <ListItemText 
                            primary="Import/Export Restrictions" 
                            secondary={legalGuidance.crossBorderConsiderations.importExportRestrictions}
                          />
                        </ListItem>
                        <Divider component="li" />
                        <ListItem>
                          <ListItemIcon>
                            <GavelIcon color="primary" />
                          </ListItemIcon>
                          <ListItemText 
                            primary="International Recognition" 
                            secondary={legalGuidance.crossBorderConsiderations.internationalRecognition}
                          />
                        </ListItem>
                        <Divider component="li" />
                        <ListItem>
                          <ListItemIcon>
                            <GavelIcon color="primary" />
                          </ListItemIcon>
                          <ListItemText 
                            primary="Return Home Considerations" 
                            secondary={legalGuidance.crossBorderConsiderations.returnHomeConsiderations}
                          />
                        </ListItem>
                      </List>
                    </AccordionDetails>
                  </Accordion>
                </Grid>
                
                <Grid item xs={12} md={4}>
                  <Card sx={{ mb: 3 }}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Insurance & Financial
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        <strong>Insurance Coverage:</strong> {legalGuidance.insuranceAndFinancial.insuranceCoverage}
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        <strong>Public Funding:</strong> {legalGuidance.insuranceAndFinancial.publicFunding}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Tax Considerations:</strong> {legalGuidance.insuranceAndFinancial.taxConsiderations}
                      </Typography>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Legal Resources
                      </Typography>
                      <Typography variant="subtitle2" gutterBottom>
                        Recommended Legal Services:
                      </Typography>
                      <List dense>
                        {legalGuidance.legalResources.recommendedLegalServices.map((service, index) => (
                          <ListItem key={index}>
                            <ListItemIcon sx={{ minWidth: 30 }}>
                              <GavelIcon fontSize="small" color="primary" />
                            </ListItemIcon>
                            <ListItemText primary={service} />
                          </ListItem>
                        ))}
                      </List>
                      
                      <Typography variant="subtitle2" gutterBottom sx={{ mt: 2 }}>
                        Government Websites:
                      </Typography>
                      <List dense>
                        {legalGuidance.legalResources.governmentWebsites.map((website, index) => (
                          <ListItem key={index}>
                            <ListItemIcon sx={{ minWidth: 30 }}>
                              <PublicIcon fontSize="small" color="primary" />
                            </ListItemIcon>
                            <ListItemText primary={website} />
                          </ListItem>
                        ))}
                      </List>
                      
                      <Typography variant="subtitle2" gutterBottom sx={{ mt: 2 }}>
                        Support Organizations:
                      </Typography>
                      <List dense>
                        {legalGuidance.legalResources.supportOrganizations.map((org, index) => (
                          <ListItem key={index}>
                            <ListItemIcon sx={{ minWidth: 30 }}>
                              <InfoIcon fontSize="small" color="primary" />
                            </ListItemIcon>
                            <ListItemText primary={org} />
                          </ListItem>
                        ))}
                      </List>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
              
              <Box mt={4} p={3} bgcolor="#f5f5f5" borderRadius={1}>
                <Typography variant="body2" color="text.secondary">
                  <strong>Disclaimer:</strong> This information is provided as general guidance only and should not be considered legal advice. Laws and regulations may change, and individual circumstances vary. We recommend consulting with a legal professional specializing in reproductive law for your specific situation.
                </Typography>
              </Box>
            </Box>
          )}
          
          {!loading && !legalGuidance && selectedCountry && (
            <Alert severity="info" sx={{ mt: 2 }}>
              <AlertTitle>Information Not Available</AlertTitle>
              We don't have detailed legal information for {selectedCountry} yet. Please contact our support team for assistance.
            </Alert>
          )}
          
          {!loading && !legalGuidance && !selectedCountry && (
            <Box textAlign="center" py={6}>
              <PublicIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
              <Typography variant="h6" color="text.secondary">
                Select a country to view legal guidance
              </Typography>
            </Box>
          )}
        </Box>
      )}
      
      {/* Legal Comparison Tab */}
      {activeTab === 1 && (
        <Box>
          <Card sx={{ mb: 4 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Compare Legal Requirements
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Compare fertility laws between your home country and your treatment destination.
              </Typography>
              
              <Grid container spacing={3}>
                <Grid item xs={12} md={5}>
                  <Autocomplete
                    options={mockCountries}
                    value={homeCountry}
                    onChange={(event, value) => setHomeCountry(value)}
                    renderInput={(params) => (
                      <TextField 
                        {...params} 
                        label="Your Home Country" 
                        variant="outlined" 
                        placeholder="Select your home country"
                        fullWidth
                      />
                    )}
                  />
                </Grid>
                
                <Grid item xs={12} md={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <CompareArrowsIcon sx={{ fontSize: 40, color: 'text.secondary' }} />
                </Grid>
                
                <Grid item xs={12} md={5}>
                  <Autocomplete
                    options={mockCountries}
                    value={destinationCountry}
                    onChange={(event, value) => setDestinationCountry(value)}
                    renderInput={(params) => (
                      <TextField 
                        {...params} 
                        label="Treatment Destination" 
                        variant="outlined" 
                        placeholder="Select treatment destination"
                        fullWidth
                      />
                    )}
                  />
                </Grid>
              </Grid>
              
              <Box textAlign="center" mt={3}>
                <Button 
                  variant="contained" 
                  color="primary" 
                  size="large"
                  onClick={handleCompare}
                  disabled={!homeCountry || !destinationCountry || loading}
                  startIcon={<CompareArrowsIcon />}
                >
                  Compare Legal Requirements
                </Button>
              </Box>
            </CardContent>
          </Card>
          
          {loading && (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="300px">
              <CircularProgress />
            </Box>
          )}
          
          {!loading && showComparison && comparisonData && (
            <Box>
              <Typography variant="h5" gutterBottom>
                Legal Comparison: {comparisonData.homeCountry.country} vs. {comparisonData.destinationCountry.country}
              </Typography>
              
              <Alert severity="info" sx={{ mb: 3 }}>
                <AlertTitle>Important Note</AlertTitle>
                This comparison highlights key differences in fertility laws and requirements between countries. Always consult with a legal professional before making decisions.
              </Alert>
              
              <Accordion defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6">Treatment Regulations Comparison</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <TableContainer component={Paper} variant="outlined">
                    <Table>
                      <thead>
                        <tr>
                          <th style={{ width: '20%', padding: '16px' }}>Regulation</th>
                          <th style={{ width: '40%', padding: '16px' }}>{comparisonData.homeCountry.country}</th>
                          <th style={{ width: '40%', padding: '16px' }}>{comparisonData.destinationCountry.country}</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td style={{ padding: '16px' }}><strong>IVF</strong></td>
                          <td style={{ padding: '16px' }}>
                            {comparisonData.homeCountry.fertilityLaws.ivfRegulations}
                            {renderLegalStatus(comparisonData.homeCountry.fertilityLaws.ivfRegulations)}
                          </td>
                          <td style={{ padding: '16px' }}>
                            {comparisonData.destinationCountry.fertilityLaws.ivfRegulations}
                            {renderLegalStatus(comparisonData.destinationCountry.fertilityLaws.ivfRegulations)}
                          </td>
                        </tr>
                        <tr>
                          <td style={{ padding: '16px' }}><strong>Egg Donation</strong></td>
                          <td style={{ padding: '16px' }}>
                            {comparisonData.homeCountry.fertilityLaws.donorEggRegulations}
                            {renderLegalStatus(comparisonData.homeCountry.fertilityLaws.donorEggRegulations)}
                          </td>
                          <td style={{ padding: '16px' }}>
                            {comparisonData.destinationCountry.fertilityLaws.donorEggRegulations}
                            {renderLegalStatus(comparisonData.destinationCountry.fertilityLaws.donorEggRegulations)}
                          </td>
                        </tr>
                        <tr>
                          <td style={{ padding: '16px' }}><strong>Surrogacy</strong></td>
                          <td style={{ padding: '16px' }}>
                            {comparisonData.homeCountry.fertilityLaws.surrogacyRegulations}
                            {renderLegalStatus(comparisonData.homeCountry.fertilityLaws.surrogacyRegulations)}
                          </td>
                          <td style={{ padding: '16px' }}>
                            {comparisonData.destinationCountry.fertilityLaws.surrogacyRegulations}
                            {renderLegalStatus(comparisonData.destinationCountry.fertilityLaws.surrogacyRegulations)}
                          </td>
                        </tr>
                        <tr>
                          <td style={{ padding: '16px' }}><strong>Single Parents</strong></td>
                          <td style={{ padding: '16px' }}>
                            {comparisonData.homeCountry.fertilityLaws.singleParentRegulations}
                            {renderLegalStatus(comparisonData.homeCountry.fertilityLaws.singleParentRegulations)}
                          </td>
                          <td style={{ padding: '16px' }}>
                            {comparisonData.destinationCountry.fertilityLaws.singleParentRegulations}
                            {renderLegalStatus(comparisonData.destinationCountry.fertilityLaws.singleParentRegulations)}
                          </td>
                        </tr>
                        <tr>
                          <td style={{ padding: '16px' }}><strong>LGBTQ+</strong></td>
                          <td style={{ padding: '16px' }}>
                            {comparisonData.homeCountry.fertilityLaws.lgbtqRegulations}
                            {renderLegalStatus(comparisonData.homeCountry.fertilityLaws.lgbtqRegulations)}
                          </td>
                          <td style={{ padding: '16px' }}>
                            {comparisonData.destinationCountry.fertilityLaws.lgbtqRegulations}
                            {renderLegalStatus(comparisonData.destinationCountry.fertilityLaws.lgbtqRegulations)}
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </TableContainer>
                </AccordionDetails>
              </Accordion>
              
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6">Cross-Border Considerations</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Card variant="outlined">
                        <CardContent>
                          <Typography variant="h6" gutterBottom>
                            Import/Export Restrictions
                          </Typography>
                          <Typography variant="body1">
                            {comparisonData.crossBorderConsiderations.importExportRestrictions}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                    
                    <Grid item xs={12}>
                      <Card variant="outlined">
                        <CardContent>
                          <Typography variant="h6" gutterBottom>
                            International Recognition
                          </Typography>
                          <Typography variant="body1">
                            {comparisonData.crossBorderConsiderations.internationalRecognition}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                    
                    <Grid item xs={12}>
                      <Card variant="outlined">
                        <CardContent>
                          <Typography variant="h6" gutterBottom>
                            Return Home Considerations
                          </Typography>
                          <Typography variant="body1">
                            {comparisonData.crossBorderConsiderations.returnHomeConsiderations}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
              
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6">Parental Rights & Citizenship</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <TableContainer component={Paper} variant="outlined">
                    <Table>
                      <thead>
                        <tr>
                          <th style={{ width: '20%', padding: '16px' }}>Consideration</th>
                          <th style={{ width: '40%', padding: '16px' }}>{comparisonData.homeCountry.country}</th>
                          <th style={{ width: '40%', padding: '16px' }}>{comparisonData.destinationCountry.country}</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td style={{ padding: '16px' }}><strong>Parental Rights</strong></td>
                          <td style={{ padding: '16px' }}>
                            {comparisonData.homeCountry.legalRequirements.parentalRights}
                          </td>
                          <td style={{ padding: '16px' }}>
                            {comparisonData.destinationCountry.legalRequirements.parentalRights}
                          </td>
                        </tr>
                        <tr>
                          <td style={{ padding: '16px' }}><strong>Birth Certificate</strong></td>
                          <td style={{ padding: '16px' }}>
                            {comparisonData.homeCountry.legalRequirements.birthCertificateProcess}
                          </td>
                          <td style={{ padding: '16px' }}>
                            {comparisonData.destinationCountry.legalRequirements.birthCertificateProcess}
                          </td>
                        </tr>
                        <tr>
                          <td style={{ padding: '16px' }}><strong>Citizenship</strong></td>
                          <td style={{ padding: '16px' }}>
                            {comparisonData.homeCountry.legalRequirements.citizenshipConsiderations}
                          </td>
                          <td style={{ padding: '16px' }}>
                            {comparisonData.destinationCountry.legalRequirements.citizenshipConsiderations}
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </TableContainer>
                </AccordionDetails>
              </Accordion>
              
              <Box mt={4} textAlign="center">
                <Button 
                  variant="contained" 
                  color="primary"
                >
                  Download Comparison Report
                </Button>
              </Box>
              
              <Box mt={4} p={3} bgcolor="#f5f5f5" borderRadius={1}>
                <Typography variant="body2" color="text.secondary">
                  <strong>Disclaimer:</strong> This comparison is provided as general guidance only and should not be considered legal advice. Laws and regulations may change, and individual circumstances vary. We recommend consulting with a legal professional specializing in reproductive law and international family law for your specific situation.
                </Typography>
              </Box>
            </Box>
          )}
          
          {!loading && !showComparison && (
            <Box textAlign="center" py={6}>
              <CompareArrowsIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
              <Typography variant="h6" color="text.secondary">
                Select countries to compare legal requirements
              </Typography>
            </Box>
          )}
        </Box>
      )}
      
      {/* Search by Requirements Tab */}
      {activeTab === 2 && (
        <Box>
          <Card sx={{ mb: 4 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Find Countries by Legal Requirements
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Search for countries that meet your specific legal needs for fertility treatment.
              </Typography>
              
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" gutterBottom>
                      Treatment Type
                    </Typography>
                    <RadioGroup
                      value={treatmentType}
                      onChange={(e) => setTreatmentType(e.target.value)}
                    >
                      <FormControlLabel value="ivf" control={<Radio />} label="IVF with Own Gametes" />
                      <FormControlLabel value="donor-eggs" control={<Radio />} label="Egg Donation" />
                      <FormControlLabel value="donor-sperm" control={<Radio />} label="Sperm Donation" />
                      <FormControlLabel value="donor-embryo" control={<Radio />} label="Embryo Donation" />
                      <FormControlLabel value="surrogacy" control={<Radio />} label="Surrogacy" />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" gutterBottom>
                      Additional Requirements
                    </Typography>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={singleParent === 'true'}
                          onChange={(e) => setSingleParent(e.target.checked ? 'true' : '')}
                        />
                      }
                      label="Available for Single Parents"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={lgbtq === 'true'}
                          onChange={(e) => setLgbtq(e.target.checked ? 'true' : '')}
                        />
                      }
                      label="Available for LGBTQ+ Individuals/Couples"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={ageAbove45 === 'true'}
                          onChange={(e) => setAgeAbove45(e.target.checked ? 'true' : '')}
                        />
                      }
                      label="Available for Patients Over 45"
                    />
                  </FormControl>
                </Grid>
              </Grid>
              
              <Box textAlign="center" mt={3}>
                <Button 
                  variant="contained" 
                  color="primary" 
                  size="large"
                  onClick={handleSearch}
                  disabled={!treatmentType || loading}
                  startIcon={<SearchIcon />}
                >
                  Search Countries
                </Button>
              </Box>
            </CardContent>
          </Card>
          
          {loading && (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="300px">
              <CircularProgress />
            </Box>
          )}
          
          {!loading && searchResults.length > 0 && (
            <Box>
              <Typography variant="h5" gutterBottom>
                Search Results
              </Typography>
              <Typography variant="body1" paragraph>
                The following countries meet your specified legal requirements:
              </Typography>
              
              <Grid container spacing={3}>
                {searchResults.map((country, index) => (
                  <Grid item xs={12} md={4} key={index}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                          {country.country}
                        </Typography>
                        
                        <List dense>
                          <ListItem>
                            <ListItemIcon>
                              <GavelIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText 
                              primary="IVF Regulations" 
                              secondary={country.fertilityLaws.ivfRegulations}
                            />
                            {renderLegalStatus(country.fertilityLaws.ivfRegulations)}
                          </ListItem>
                          
                          <ListItem>
                            <ListItemIcon>
                              <GavelIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText 
                              primary="Egg Donation" 
                              secondary={country.fertilityLaws.donorEggRegulations}
                            />
                            {renderLegalStatus(country.fertilityLaws.donorEggRegulations)}
                          </ListItem>
                          
                          <ListItem>
                            <ListItemIcon>
                              <GavelIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText 
                              primary="Surrogacy" 
                              secondary={country.fertilityLaws.surrogacyRegulations}
                            />
                            {renderLegalStatus(country.fertilityLaws.surrogacyRegulations)}
                          </ListItem>
                        </List>
                        
                        <Button 
                          variant="outlined" 
                          color="primary" 
                          fullWidth
                          sx={{ mt: 2 }}
                        >
                          View Full Legal Guide
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}
          
          {!loading && searchResults.length === 0 && treatmentType && (
            <Alert severity="info" sx={{ mt: 2 }}>
              <AlertTitle>No Results Found</AlertTitle>
              No countries matching your specific requirements were found. Try adjusting your search criteria or contact our support team for personalized assistance.
            </Alert>
          )}
          
          {!loading && !treatmentType && searchResults.length === 0 && (
            <Box textAlign="center" py={6}>
              <SearchIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
              <Typography variant="h6" color="text.secondary">
                Select your requirements to search for compatible countries
              </Typography>
            </Box>
          )}
        </Box>
      )}
      
      <Box textAlign="center" mt={6} p={3} bgcolor="#f5f5f5" borderRadius={2}>
        <Typography variant="h6" gutterBottom>
          Need personalized legal guidance?
        </Typography>
        <Typography variant="body1" paragraph>
          Our network of fertility law specialists can provide customized advice for your specific situation.
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          size="large"
        >
          Connect with a Fertility Law Specialist
        </Button>
      </Box>
    </Container>
  );
};

export default LegalGuidanceSystem;
