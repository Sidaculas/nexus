import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { 
  Box, 
  Stepper, 
  Step, 
  StepLabel, 
  Typography, 
  Button, 
  Container,
  Grid,
  Card,
  CardContent,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Checkbox,
  FormGroup,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  LinearProgress,
  Chip,
  Stack,
  Divider
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

// Mock data for country and state dropdowns
const countries = [
  { value: 'us', label: 'United States' },
  { value: 'ca', label: 'Canada' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'au', label: 'Australia' },
  { value: 'mx', label: 'Mexico' },
];

const states = {
  us: [
    { value: 'ca', label: 'California' },
    { value: 'ny', label: 'New York' },
    { value: 'tx', label: 'Texas' },
    { value: 'fl', label: 'Florida' },
  ],
  ca: [
    { value: 'on', label: 'Ontario' },
    { value: 'bc', label: 'British Columbia' },
    { value: 'qc', label: 'Quebec' },
  ],
  uk: [
    { value: 'eng', label: 'England' },
    { value: 'sco', label: 'Scotland' },
    { value: 'wal', label: 'Wales' },
  ],
};

// Quiz steps
const steps = [
  'Fertility Goals',
  'Treatment History',
  'Location & Travel',
  'Budget',
  'Timeline',
  'Personal Preferences'
];

const OnboardingQuiz = () => {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});
  const [quizData, setQuizData] = useState({
    // Section 1: Fertility Goals
    fertilityGoal: '',
    
    // Section 2: Treatment History
    previousTreatment: '',
    treatmentOutcome: '',
    diagnosedConditions: [],
    otherCondition: '',
    
    // Section 3: Location and Travel
    country: '',
    state: '',
    city: '',
    travelDistance: '',
    locationFactors: [],
    
    // Section 4: Budget
    budget: '',
    financingInterest: '',
    insuranceCoverage: '',
    
    // Section 5: Timeline
    timeline: '',
    timingConsiderations: [],
    otherTimingConsideration: '',
    
    // Section 6: Personal Preferences
    relationshipStatus: '',
    supportTypes: [],
    referralSource: '',
    otherReferralSource: '',
  });

  const handleNext = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setQuizData({
      ...quizData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (event) => {
    const { name, value, checked } = event.target;
    
    if (checked) {
      setQuizData({
        ...quizData,
        [name]: [...quizData[name], value],
      });
    } else {
      setQuizData({
        ...quizData,
        [name]: quizData[name].filter(item => item !== value),
      });
    }
  };

  const handleSubmit = () => {
    // Here you would typically send the data to your backend
    console.log('Quiz data submitted:', quizData);
    
    // Navigate to results or dashboard
    router.push('/dashboard');
  };

  const isStepComplete = (step) => {
    return completed[step];
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <Typography variant="h5" gutterBottom>
              What is your primary fertility goal?
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              This helps us match you with the most relevant clinics and resources.
            </Typography>
            
            <FormControl component="fieldset" fullWidth>
              <Grid container spacing={2}>
                {[
                  { value: 'own-gametes', label: 'Having a child using my own eggs/sperm', description: 'Traditional IVF or other fertility treatments using your genetic material' },
                  { value: 'donor-eggs', label: 'Having a child using donor eggs', description: 'IVF using donor eggs and partner\'s or donor sperm' },
                  { value: 'donor-sperm', label: 'Having a child using donor sperm', description: 'IVF or IUI using donor sperm and your own eggs' },
                  { value: 'donor-embryo', label: 'Having a child using donor embryos', description: 'Embryo adoption/donation from another family' },
                  { value: 'surrogacy', label: 'Exploring surrogacy options', description: 'Working with a surrogate to carry your child' },
                  { value: 'fertility-preservation', label: 'Preserving fertility for future', description: 'Freezing eggs, sperm, or embryos for later use' },
                  { value: 'not-sure', label: 'Not sure yet, need guidance', description: 'We\'ll help you explore all available options' },
                ].map((option) => (
                  <Grid item xs={12} sm={6} key={option.value}>
                    <Card 
                      sx={{ 
                        height: '100%', 
                        cursor: 'pointer',
                        border: quizData.fertilityGoal === option.value ? '2px solid #2A9D8F' : '1px solid #e0e0e0',
                        backgroundColor: quizData.fertilityGoal === option.value ? '#E6F2F0' : 'white',
                      }}
                      onClick={() => setQuizData({...quizData, fertilityGoal: option.value})}
                    >
                      <CardContent>
                        <Box display="flex" alignItems="flex-start">
                          <Radio
                            checked={quizData.fertilityGoal === option.value}
                            onChange={handleChange}
                            value={option.value}
                            name="fertilityGoal"
                          />
                          <Box>
                            <Typography variant="h6">{option.label}</Typography>
                            <Typography variant="body2" color="text.secondary">
                              {option.description}
                            </Typography>
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </FormControl>
          </Box>
        );
      
      case 1:
        return (
          <Box>
            <Typography variant="h5" gutterBottom>
              Tell us about your fertility treatment history
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              This information helps us provide more personalized recommendations.
            </Typography>
            
            <Box mb={4}>
              <FormControl component="fieldset" fullWidth>
                <FormLabel component="legend">Have you undergone any fertility treatments before?</FormLabel>
                <RadioGroup
                  name="previousTreatment"
                  value={quizData.previousTreatment}
                  onChange={handleChange}
                >
                  <FormControlLabel value="none" control={<Radio />} label="No, this will be my first fertility treatment" />
                  <FormControlLabel value="iui" control={<Radio />} label="Yes, I've had IUI treatment(s)" />
                  <FormControlLabel value="ivf" control={<Radio />} label="Yes, I've had IVF treatment(s)" />
                  <FormControlLabel value="other" control={<Radio />} label="Yes, I've had other fertility treatments" />
                </RadioGroup>
              </FormControl>
            </Box>
            
            {quizData.previousTreatment && quizData.previousTreatment !== 'none' && (
              <Box mb={4}>
                <FormControl component="fieldset" fullWidth>
                  <FormLabel component="legend">What were the outcomes of your previous treatments?</FormLabel>
                  <RadioGroup
                    name="treatmentOutcome"
                    value={quizData.treatmentOutcome}
                    onChange={handleChange}
                  >
                    <FormControlLabel value="no-pregnancy" control={<Radio />} label="No pregnancy achieved" />
                    <FormControlLabel value="not-carried" control={<Radio />} label="Pregnancy achieved but not carried to term" />
                    <FormControlLabel value="successful" control={<Radio />} label="Successful pregnancy and birth" />
                    <FormControlLabel value="in-progress" control={<Radio />} label="Currently in treatment/waiting for results" />
                  </RadioGroup>
                </FormControl>
              </Box>
            )}
            
            <Box>
              <FormControl component="fieldset" fullWidth>
                <FormLabel component="legend">Do you have any diagnosed fertility conditions?</FormLabel>
                <FormGroup>
                  {[
                    { value: 'none', label: 'No diagnosed conditions' },
                    { value: 'diminished-reserve', label: 'Diminished ovarian reserve' },
                    { value: 'pcos', label: 'PCOS (Polycystic Ovary Syndrome)' },
                    { value: 'endometriosis', label: 'Endometriosis' },
                    { value: 'male-factor', label: 'Male factor infertility' },
                    { value: 'unexplained', label: 'Unexplained infertility' },
                    { value: 'other', label: 'Other' },
                    { value: 'prefer-not-say', label: 'Prefer not to say' },
                  ].map((option) => (
                    <FormControlLabel
                      key={option.value}
                      control={
                        <Checkbox
                          checked={quizData.diagnosedConditions.includes(option.value)}
                          onChange={handleCheckboxChange}
                          name="diagnosedConditions"
                          value={option.value}
                        />
                      }
                      label={option.label}
                    />
                  ))}
                </FormGroup>
              </FormControl>
              
              {quizData.diagnosedConditions.includes('other') && (
                <TextField
                  fullWidth
                  margin="normal"
                  name="otherCondition"
                  label="Please specify other condition"
                  value={quizData.otherCondition}
                  onChange={handleChange}
                />
              )}
            </Box>
          </Box>
        );
      
      case 2:
        return (
          <Box>
            <Typography variant="h5" gutterBottom>
              Location and Travel Preferences
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              Help us understand your location and how far you're willing to travel for treatment.
            </Typography>
            
            <Box mb={4}>
              <Typography variant="h6" gutterBottom>
                Where are you currently located?
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth>
                    <InputLabel>Country</InputLabel>
                    <Select
                      name="country"
                      value={quizData.country}
                      label="Country"
                      onChange={handleChange}
                    >
                      {countries.map((country) => (
                        <MenuItem key={country.value} value={country.value}>
                          {country.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth disabled={!quizData.country || !states[quizData.country]}>
                    <InputLabel>State/Province</InputLabel>
                    <Select
                      name="state"
                      value={quizData.state}
                      label="State/Province"
                      onChange={handleChange}
                    >
                      {quizData.country && states[quizData.country] && 
                        states[quizData.country].map((state) => (
                          <MenuItem key={state.value} value={state.value}>
                            {state.label}
                          </MenuItem>
                        ))
                      }
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    name="city"
                    label="City"
                    value={quizData.city}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
            </Box>
            
            <Box mb={4}>
              <FormControl component="fieldset" fullWidth>
                <FormLabel component="legend">How far are you willing to travel for fertility treatment?</FormLabel>
                <RadioGroup
                  name="travelDistance"
                  value={quizData.travelDistance}
                  onChange={handleChange}
                >
                  <FormControlLabel value="local" control={<Radio />} label="Local options only (within my city/region)" />
                  <FormControlLabel value="country" control={<Radio />} label="Within my country" />
                  <FormControlLabel value="neighboring" control={<Radio />} label="Neighboring countries" />
                  <FormControlLabel value="worldwide" control={<Radio />} label="Anywhere worldwide" />
                  <FormControlLabel value="specific" control={<Radio />} label="Specific regions" />
                </RadioGroup>
              </FormControl>
            </Box>
            
            <Box>
              <FormControl component="fieldset" fullWidth>
                <FormLabel component="legend">What factors are most important in choosing a treatment location? (Select up to 3)</FormLabel>
                <FormGroup>
                  {[
                    { value: 'cost', label: 'Cost of treatment' },
                    { value: 'success-rates', label: 'Success rates' },
                    { value: 'legal', label: 'Legal framework' },
                    { value: 'language', label: 'Language/cultural considerations' },
                    { value: 'travel', label: 'Travel convenience' },
                    { value: 'waiting-times', label: 'Waiting times' },
                    { value: 'healthcare-quality', label: 'Quality of healthcare system' },
                    { value: 'recommendations', label: 'Recommendation from others' },
                  ].map((option) => (
                    <FormControlLabel
                      key={option.value}
                      control={
                        <Checkbox
                          checked={quizData.locationFactors.includes(option.value)}
                          onChange={handleCheckboxChange}
                          name="locationFactors"
                          value={option.value}
                          disabled={quizData.locationFactors.length >= 3 && !quizData.locationFactors.includes(option.value)}
                        />
                      }
                      label={option.label}
                    />
                  ))}
                </FormGroup>
              </FormControl>
            </Box>
          </Box>
        );
      
      case 3:
        return (
          <Box>
            <Typography variant="h5" gutterBottom>
              Budget and Financial Considerations
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              Understanding your budget helps us recommend affordable options for your fertility journey.
            </Typography>
            
            <Box mb={4}>
              <FormControl component="fieldset" fullWidth>
                <FormLabel component="legend">What is your approximate budget for fertility treatment?</FormLabel>
                <RadioGroup
                  name="budget"
                  value={quizData.budget}
                  onChange={handleChange}
                >
                  <FormControlLabel value="under-5k" control={<Radio />} label="Under $5,000" />
                  <FormControlLabel value="5k-10k" control={<Radio />} label="$5,000 - $10,000" />
                  <FormControlLabel value="10k-15k" control={<Radio />} label="$10,000 - $15,000" />
                  <FormControlLabel value="15k-20k" control={<Radio />} label="$15,000 - $20,000" />
                  <FormControlLabel value="20k-30k" control={<Radio />} label="$20,000 - $30,000" />
                  <FormControlLabel value="over-30k" control={<Radio />} label="Over $30,000" />
                  <FormControlLabel value="flexible" control={<Radio />} label="Flexible/Not sure yet" />
                </RadioGroup>
              </FormControl>
            </Box>
            
            <Box mb={4}>
              <FormControl component="fieldset" fullWidth>
                <FormLabel component="legend">Are you interested in financing options or financial assistance programs?</FormLabel>
                <RadioGroup
                  name="financingInterest"
                  value={quizData.financingInterest}
                  onChange={handleChange}
                >
                  <FormControlLabel value="financing" control={<Radio />} label="Yes, I'd like information on financing" />
                  <FormControlLabel value="assistance" control={<Radio />} label="Yes, I'd like information on grants/financial assistance" />
                  <FormControlLabel value="out-of-pocket" control={<Radio />} label="No, I plan to pay out-of-pocket" />
                  <FormControlLabel value="not-sure" control={<Radio />} label="Not sure yet" />
                </RadioGroup>
              </FormControl>
            </Box>
            
            <Box>
              <FormControl component="fieldset" fullWidth>
                <FormLabel component="legend">Does your insurance cover any fertility treatments?</FormLabel>
                <RadioGroup
                  name="insuranceCoverage"
                  value={quizData.insuranceCoverage}
                  onChange={handleChange}
                >
                  <FormControlLabel value="comprehensive" control={<Radio />} label="Yes, comprehensive coverage" />
                  <FormControlLabel value="partial" control={<Radio />} label="Yes, partial coverage" />
                  <FormControlLabel value="no-coverage" control={<Radio />} label="No coverage" />
                  <FormControlLabel value="not-sure" control={<Radio />} label="Not sure" />
                  <FormControlLabel value="no-insurance" control={<Radio />} label="I don't have insurance" />
                </RadioGroup>
              </FormControl>
            </Box>
          </Box>
        );
      
      case 4:
        return (
          <Box>
            <Typography variant="h5" gutterBottom>
              Timeline and Urgency
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              Understanding your timeline helps us prioritize recommendations and resources.
            </Typography>
            
            <Box mb={4}>
              <FormControl component="fieldset" fullWidth>
                <FormLabel component="legend">What is your preferred timeline for beginning treatment?</FormLabel>
                <RadioGroup
                  name="timeline"
                  value={quizData.timeline}
                  onChange={handleChange}
                >
                  <FormControlLabel value="asap" control={<Radio />} label="As soon as possible" />
                  <FormControlLabel value="3-months" control={<Radio />} label="Within the next 3 months" />
                  <FormControlLabel value="6-months" control={<Radio />} label="Within the next 6 months" />
                  <FormControlLabel value="1-year" control={<Radio />} label="Within the next year" />
                  <FormControlLabel value="researching" control={<Radio />} label="Just researching options for now" />
                </RadioGroup>
              </FormControl>
            </Box>
            
            <Box>
              <FormControl component="fieldset" fullWidth>
                <FormLabel component="legend">Are there any specific timing considerations we should know about?</FormLabel>
                <FormGroup>
                  {[
                    { value: 'age', label: 'Age-related concerns' },
                    { value: 'medical', label: 'Medical treatment schedule' },
                    { value: 'work', label: 'Work/career considerations' },
                    { value: 'life-events', label: 'Specific life events (wedding, move, etc.)' },
                    { value: 'none', label: 'None/No specific timing concerns' },
                    { value: 'other', label: 'Other' },
                  ].map((option) => (
                    <FormControlLabel
                      key={option.value}
                      control={
                        <Checkbox
                          checked={quizData.timingConsiderations.includes(option.value)}
                          onChange={handleCheckboxChange}
                          name="timingConsiderations"
                          value={option.value}
                        />
                      }
                      label={option.label}
                    />
                  ))}
                </FormGroup>
              </FormControl>
              
              {quizData.timingConsiderations.includes('other') && (
                <TextField
                  fullWidth
                  margin="normal"
                  name="otherTimingConsideration"
                  label="Please specify other timing consideration"
                  value={quizData.otherTimingConsideration}
                  onChange={handleChange}
                />
              )}
            </Box>
          </Box>
        );
      
      case 5:
        return (
          <Box>
            <Typography variant="h5" gutterBottom>
              Personal Preferences and Support
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              Help us understand your personal situation and support needs.
            </Typography>
            
            <Box mb={4}>
              <FormControl component="fieldset" fullWidth>
                <FormLabel component="legend">What is your relationship status?</FormLabel>
                <RadioGroup
                  name="relationshipStatus"
                  value={quizData.relationshipStatus}
                  onChange={handleChange}
                >
                  <FormControlLabel value="single" control={<Radio />} label="Single" />
                  <FormControlLabel value="relationship" control={<Radio />} label="In a relationship" />
                  <FormControlLabel value="married" control={<Radio />} label="Married" />
                  <FormControlLabel value="other" control={<Radio />} label="Other" />
                  <FormControlLabel value="prefer-not-say" control={<Radio />} label="Prefer not to say" />
                </RadioGroup>
              </FormControl>
            </Box>
            
            <Box mb={4}>
              <FormControl component="fieldset" fullWidth>
                <FormLabel component="legend">What type of support are you most interested in receiving?</FormLabel>
                <FormGroup>
                  {[
                    { value: 'medical', label: 'Medical information and guidance' },
                    { value: 'emotional', label: 'Emotional support' },
                    { value: 'legal', label: 'Legal guidance' },
                    { value: 'financial', label: 'Financial planning' },
                    { value: 'travel', label: 'Travel coordination' },
                    { value: 'community', label: 'Community connection with others' },
                    { value: 'all', label: 'All of the above' },
                  ].map((option) => (
                    <FormControlLabel
                      key={option.value}
                      control={
                        <Checkbox
                          checked={quizData.supportTypes.includes(option.value)}
                          onChange={handleCheckboxChange}
                          name="supportTypes"
                          value={option.value}
                        />
                      }
                      label={option.label}
                    />
                  ))}
                </FormGroup>
              </FormControl>
            </Box>
            
            <Box>
              <FormControl component="fieldset" fullWidth>
                <FormLabel component="legend">How did you hear about IVF Nexus?</FormLabel>
                <RadioGroup
                  name="referralSource"
                  value={quizData.referralSource}
                  onChange={handleChange}
                >
                  <FormControlLabel value="search" control={<Radio />} label="Search engine" />
                  <FormControlLabel value="social" control={<Radio />} label="Social media" />
                  <FormControlLabel value="friend" control={<Radio />} label="Friend or family recommendation" />
                  <FormControlLabel value="doctor" control={<Radio />} label="Doctor recommendation" />
                  <FormControlLabel value="forum" control={<Radio />} label="Fertility forum/community" />
                  <FormControlLabel value="news" control={<Radio />} label="News article" />
                  <FormControlLabel value="other" control={<Radio />} label="Other" />
                </RadioGroup>
              </FormControl>
              
              {quizData.referralSource === 'other' && (
                <TextField
                  fullWidth
                  margin="normal"
                  name="otherReferralSource"
                  label="Please specify"
                  value={quizData.otherReferralSource}
                  onChange={handleChange}
                />
              )}
            </Box>
          </Box>
        );
      
      case 6:
        return (
          <Box>
            <Typography variant="h5" gutterBottom align="center">
              Quiz Complete!
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }} align="center">
              Thank you for sharing your fertility journey with us. Here's a summary of your responses:
            </Typography>
            
            <Box sx={{ mb: 4, p: 3, backgroundColor: '#f5f5f5', borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom>
                Your Fertility Profile
              </Typography>
              
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Box mb={2}>
                    <Typography variant="subtitle1" fontWeight="bold">Fertility Goal:</Typography>
                    <Typography variant="body1">
                      {quizData.fertilityGoal === 'own-gametes' && 'Having a child using my own eggs/sperm'}
                      {quizData.fertilityGoal === 'donor-eggs' && 'Having a child using donor eggs'}
                      {quizData.fertilityGoal === 'donor-sperm' && 'Having a child using donor sperm'}
                      {quizData.fertilityGoal === 'donor-embryo' && 'Having a child using donor embryos'}
                      {quizData.fertilityGoal === 'surrogacy' && 'Exploring surrogacy options'}
                      {quizData.fertilityGoal === 'fertility-preservation' && 'Preserving fertility for future'}
                      {quizData.fertilityGoal === 'not-sure' && 'Not sure yet, need guidance'}
                    </Typography>
                  </Box>
                  
                  <Box mb={2}>
                    <Typography variant="subtitle1" fontWeight="bold">Treatment History:</Typography>
                    <Typography variant="body1">
                      {quizData.previousTreatment === 'none' && 'First-time fertility treatment'}
                      {quizData.previousTreatment === 'iui' && 'Previous IUI treatment'}
                      {quizData.previousTreatment === 'ivf' && 'Previous IVF treatment'}
                      {quizData.previousTreatment === 'other' && 'Other previous fertility treatments'}
                    </Typography>
                  </Box>
                  
                  <Box mb={2}>
                    <Typography variant="subtitle1" fontWeight="bold">Budget Range:</Typography>
                    <Typography variant="body1">
                      {quizData.budget === 'under-5k' && 'Under $5,000'}
                      {quizData.budget === '5k-10k' && '$5,000 - $10,000'}
                      {quizData.budget === '10k-15k' && '$10,000 - $15,000'}
                      {quizData.budget === '15k-20k' && '$15,000 - $20,000'}
                      {quizData.budget === '20k-30k' && '$20,000 - $30,000'}
                      {quizData.budget === 'over-30k' && 'Over $30,000'}
                      {quizData.budget === 'flexible' && 'Flexible/Not sure yet'}
                    </Typography>
                  </Box>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Box mb={2}>
                    <Typography variant="subtitle1" fontWeight="bold">Location:</Typography>
                    <Typography variant="body1">
                      {quizData.country && countries.find(c => c.value === quizData.country)?.label}
                      {quizData.state && quizData.country && states[quizData.country] && 
                        `, ${states[quizData.country].find(s => s.value === quizData.state)?.label}`}
                      {quizData.city && `, ${quizData.city}`}
                    </Typography>
                  </Box>
                  
                  <Box mb={2}>
                    <Typography variant="subtitle1" fontWeight="bold">Travel Preference:</Typography>
                    <Typography variant="body1">
                      {quizData.travelDistance === 'local' && 'Local options only'}
                      {quizData.travelDistance === 'country' && 'Within my country'}
                      {quizData.travelDistance === 'neighboring' && 'Neighboring countries'}
                      {quizData.travelDistance === 'worldwide' && 'Anywhere worldwide'}
                      {quizData.travelDistance === 'specific' && 'Specific regions'}
                    </Typography>
                  </Box>
                  
                  <Box mb={2}>
                    <Typography variant="subtitle1" fontWeight="bold">Timeline:</Typography>
                    <Typography variant="body1">
                      {quizData.timeline === 'asap' && 'As soon as possible'}
                      {quizData.timeline === '3-months' && 'Within the next 3 months'}
                      {quizData.timeline === '6-months' && 'Within the next 6 months'}
                      {quizData.timeline === '1-year' && 'Within the next year'}
                      {quizData.timeline === 'researching' && 'Just researching options for now'}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
              
              <Divider sx={{ my: 2 }} />
              
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Support Interests:
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                {quizData.supportTypes.map((type) => (
                  <Chip 
                    key={type} 
                    label={
                      type === 'medical' ? 'Medical information' :
                      type === 'emotional' ? 'Emotional support' :
                      type === 'legal' ? 'Legal guidance' :
                      type === 'financial' ? 'Financial planning' :
                      type === 'travel' ? 'Travel coordination' :
                      type === 'community' ? 'Community connection' :
                      type === 'all' ? 'All support types' : type
                    } 
                    color="primary" 
                    size="small" 
                    sx={{ mb: 1 }}
                  />
                ))}
              </Stack>
            </Box>
            
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h6" gutterBottom>
                Next Steps
              </Typography>
              <Typography variant="body1" paragraph>
                Based on your responses, we'll personalize your IVF Nexus experience with:
              </Typography>
              <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12} sm={4}>
                  <Box sx={{ textAlign: 'center', p: 2 }}>
                    <CheckCircleIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
                    <Typography variant="subtitle1" fontWeight="bold">
                      Clinic Matches
                    </Typography>
                    <Typography variant="body2">
                      Personalized clinic recommendations based on your preferences
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Box sx={{ textAlign: 'center', p: 2 }}>
                    <CheckCircleIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
                    <Typography variant="subtitle1" fontWeight="bold">
                      Resource Library
                    </Typography>
                    <Typography variant="body2">
                      Curated educational content for your specific situation
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Box sx={{ textAlign: 'center', p: 2 }}>
                    <CheckCircleIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
                    <Typography variant="subtitle1" fontWeight="bold">
                      AI Fertility Coach
                    </Typography>
                    <Typography variant="body2">
                      24/7 support tailored to your fertility journey
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
        );
      
      default:
        return 'Unknown step';
    }
  };

  const isNextDisabled = () => {
    switch (activeStep) {
      case 0:
        return !quizData.fertilityGoal;
      case 1:
        return !quizData.previousTreatment || 
               (quizData.previousTreatment !== 'none' && !quizData.treatmentOutcome) ||
               quizData.diagnosedConditions.length === 0;
      case 2:
        return !quizData.country || !quizData.city || !quizData.travelDistance || quizData.locationFactors.length === 0;
      case 3:
        return !quizData.budget || !quizData.financingInterest || !quizData.insuranceCoverage;
      case 4:
        return !quizData.timeline || quizData.timingConsiderations.length === 0;
      case 5:
        return !quizData.relationshipStatus || quizData.supportTypes.length === 0 || !quizData.referralSource ||
               (quizData.referralSource === 'other' && !quizData.otherReferralSource);
      default:
        return false;
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ width: '100%', mb: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          IVF Nexus Onboarding Quiz
        </Typography>
        <Typography variant="body1" align="center" color="text.secondary" paragraph>
          Let's personalize your fertility journey
        </Typography>
        
        <Stepper activeStep={activeStep} alternativeLabel sx={{ mt: 4 }}>
          {steps.map((label, index) => (
            <Step key={label} completed={isStepComplete(index)}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        
        <Box sx={{ mt: 2, mb: 4 }}>
          <LinearProgress 
            variant="determinate" 
            value={(activeStep / (steps.length)) * 100} 
            sx={{ height: 10, borderRadius: 5 }}
          />
        </Box>
      </Box>
      
      <Card sx={{ mb: 4, p: { xs: 2, md: 4 } }}>
        <CardContent>
          {activeStep === steps.length ? (
            <Box sx={{ mt: 2 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                size="large"
                fullWidth
                sx={{ mt: 2, py: 1.5 }}
              >
                Go to Dashboard
              </Button>
            </Box>
          ) : (
            <>
              {getStepContent(activeStep)}
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  startIcon={<ArrowBackIcon />}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}
                  endIcon={activeStep === steps.length - 1 ? null : <ArrowForwardIcon />}
                  disabled={isNextDisabled()}
                >
                  {activeStep === steps.length - 1 ? 'Complete Quiz' : 'Next'}
                </Button>
              </Box>
            </>
          )}
        </CardContent>
      </Card>
      
      <Box sx={{ textAlign: 'center', mt: 2 }}>
        <Typography variant="body2" color="text.secondary">
          Your privacy is important to us. All information is encrypted and secure.
        </Typography>
        <Typography variant="body2" color="primary" sx={{ mt: 1 }}>
          Need help? Chat with our AI Fertility Coach
        </Typography>
      </Box>
    </Container>
  );
};

export default OnboardingQuiz;
