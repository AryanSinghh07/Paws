import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { saveApplication } from '../services/adoptionService';

const Section = styled.section`
  min-height: 100vh;
  width: 100%;
  background: linear-gradient(135deg, ${props => props.theme.body} 0%, #1a1a1a 100%);
  padding: 2rem;
`;

const Container = styled.div`
  width: 90%;
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 30px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const Title = styled(motion.h1)`
  font-size: ${props => props.theme.fontxxxl};
  font-family: 'Kaushan Script';
  color: ${props => props.theme.text};
  text-align: center;
  margin-bottom: 2rem;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.1);

  @media (max-width: 64em) {
    font-size: ${props => props.theme.fontxxl};
  }
  @media (max-width: 48em) {
    font-size: ${props => props.theme.fontxl};
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const FormSection = styled(motion.div)`
  background: rgba(255, 255, 255, 0.03);
  padding: 2rem;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.05);

  h2 {
    font-size: ${props => props.theme.fontxl};
    color: ${props => props.theme.text};
    margin-bottom: 1.5rem;
    font-family: 'Kaushan Script';
  }
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;

  label {
    font-size: ${props => props.theme.fontmd};
    color: ${props => props.theme.text};
    opacity: 0.8;
  }

  input, select, textarea {
    padding: 1rem;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 10px;
    color: ${props => props.theme.text};
    font-size: ${props => props.theme.fontmd};
    transition: all 0.3s ease;

    &:focus {
      outline: none;
      border-color: #ffb347;
      background: rgba(255, 255, 255, 0.15);
    }
  }

  textarea {
    min-height: 100px;
    resize: vertical;
  }
`;

const RadioGroup = styled.div`
  display: flex;
  gap: 2rem;
  margin-top: 0.5rem;

  label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
  }

  input[type="radio"] {
    width: 1.2rem;
    height: 1.2rem;
    cursor: pointer;
  }
`;

const CheckboxGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;

  input[type="checkbox"] {
    width: 1.2rem;
    height: 1.2rem;
    cursor: pointer;
  }

  label {
    cursor: pointer;
  }
`;

const Button = styled(motion.button)`
  padding: 1rem 2rem;
  background: linear-gradient(90deg, #ffb347, #ffcc33);
  border: none;
  border-radius: 50px;
  color: ${props => props.theme.body};
  font-size: ${props => props.theme.fontlg};
  font-weight: 600;
  cursor: pointer;
  margin-top: 2rem;
  align-self: center;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 4px 15px rgba(255, 179, 71, 0.3);

  svg {
    width: 20px;
    height: 20px;
  }

  &:hover {
    background: linear-gradient(90deg, #ffcc33, #ffb347);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const BackButton = styled(motion.button)`
  position: absolute;
  top: 2rem;
  left: 2rem;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  padding: 0.8rem;
  border-radius: 50%;
  color: ${props => props.theme.text};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  backdrop-filter: blur(5px);
  transition: all 0.3s ease;

  svg {
    width: 24px;
    height: 24px;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: scale(1.1);
  }
`;

const AvailablePetsSection = styled(motion.div)`
  margin-bottom: 3rem;
`;

const PetsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const PetCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  overflow: hidden;
  border: 2px solid ${props => props.isSelected ? '#ffb347' : 'transparent'};
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.3);
  }
`;

const PetImage = styled.div`
  width: 100%;
  height: 200px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  ${PetCard}:hover & img {
    transform: scale(1.1);
  }
`;

const PetInfo = styled.div`
  padding: 1.5rem;
  color: ${props => props.theme.text};
`;

const PetName = styled.h3`
  font-size: ${props => props.theme.fontlg};
  margin-bottom: 0.5rem;
  font-family: 'Kaushan Script';
`;

const PetBreed = styled.p`
  font-size: ${props => props.theme.fontmd};
  opacity: 0.8;
  margin-bottom: 0.5rem;
`;

const PetDescription = styled.p`
  font-size: ${props => props.theme.fontsm};
  opacity: 0.7;
  line-height: 1.5;
`;

const SelectionBadge = styled(motion.div)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: linear-gradient(90deg, #ffb347, #ffcc33);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  color: ${props => props.theme.body};
  font-size: ${props => props.theme.fontsm};
  font-weight: 600;
  box-shadow: 0 4px 15px rgba(255, 179, 71, 0.3);
`;

const FilterSection = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
  justify-content: center;
`;

const FilterButton = styled(motion.button)`
  padding: 0.8rem 1.5rem;
  background: ${props => props.active ? 
    'linear-gradient(90deg, #ffb347, #ffcc33)' : 
    'rgba(255, 255, 255, 0.05)'
  };
  border: ${props => props.active ? 
    'none' : 
    '1px solid rgba(255, 255, 255, 0.2)'
  };
  border-radius: 25px;
  color: ${props => props.active ? props.theme.body : props.theme.text};
  font-size: ${props => props.theme.fontmd};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  backdrop-filter: blur(5px);
  transition: all 0.3s ease;

  svg {
    width: 20px;
    height: 20px;
  }

  &:hover {
    background: ${props => props.active ? 
      'linear-gradient(90deg, #ffcc33, #ffb347)' : 
      'rgba(255, 255, 255, 0.1)'
    };
    transform: translateY(-2px);
  }
`;

const SearchBar = styled(motion.div)`
  width: 100%;
  max-width: 500px;
  margin: 0 auto 2rem;
  position: relative;

  input {
    width: 100%;
    padding: 1rem 3rem 1rem 1.5rem;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 25px;
    color: ${props => props.theme.text};
    font-size: ${props => props.theme.fontmd};
    backdrop-filter: blur(5px);

    &:focus {
      outline: none;
      border-color: #ffb347;
      background: rgba(255, 255, 255, 0.1);
    }
  }

  svg {
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
    width: 24px;
    height: 24px;
    color: ${props => props.theme.text};
    opacity: 0.5;
  }
`;

const PetDetailsModal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(5px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
  padding: 2rem;
`;

const ModalContent = styled(motion.div)`
  width: 100%;
  max-width: 800px;
  background: ${props => props.theme.body};
  border-radius: 30px;
  padding: 2rem;
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ModalImage = styled.div`
  width: 100%;
  height: 400px;
  border-radius: 20px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ModalInfo = styled.div`
  color: ${props => props.theme.text};
`;

const ModalClose = styled(motion.button)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${props => props.theme.text};

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const PetStats = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin: 1.5rem 0;
`;

const StatItem = styled.div`
  background: rgba(255, 255, 255, 0.05);
  padding: 1rem;
  border-radius: 15px;
  text-align: center;

  h4 {
    font-size: ${props => props.theme.fontmd};
    margin-bottom: 0.5rem;
    opacity: 0.8;
  }

  p {
    font-size: ${props => props.theme.fontlg};
    font-weight: 600;
  }
`;

const AdoptionForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedPet, setSelectedPet] = useState(null);
  const [modalPet, setModalPet] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Handle pre-selected pet from URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const petId = params.get('pet');
    
    if (petId) {
      const pet = availablePets.find(p => p.id.toString() === petId);
      if (pet) {
        setSelectedPet(pet);
        setFormData(prev => ({
          ...prev,
          preferredPet: pet.type
        }));
      }
    }
  }, [location]);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    housingType: '',
    hasYard: '',
    otherPets: '',
    petExperience: '',
    preferredPet: '',
    workSchedule: '',
    familyAgreement: false,
    vetCare: false,
    additionalInfo: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const availablePets = [
    {
      id: 1,
      name: 'Luna',
      breed: 'Golden Retriever',
      type: 'dog',
      age: '2 years',
      image: 'https://images.unsplash.com/photo-1633722715463-d30f4f325e24',
      description: 'Friendly and energetic Golden Retriever looking for an active family.',
      gender: 'Female',
      weight: '30 kg',
      vaccinated: true,
      neutered: true,
      temperament: ['Friendly', 'Active', 'Good with kids'],
      requirements: ['Fenced yard', 'Active lifestyle', 'Experience with dogs']
    },
    {
      id: 2,
      name: 'Shadow',
      breed: 'Persian Cat',
      type: 'cat',
      age: '3 years',
      image: 'https://www.purina.in/sites/default/files/2020-12/Understanding%20Your%20Cat%27s%20Body%20LanguageTEASER.jpg',
      description: 'Gentle Persian cat who loves cuddles and quiet environments.',
      gender: 'Male',
      weight: '4.5 kg',
      vaccinated: true,
      neutered: true,
      temperament: ['Calm', 'Affectionate', 'Indoor only'],
      requirements: ['Indoor home', 'Regular grooming', 'Quiet environment']
    },
    {
      id: 3,
      name: 'Rocky',
      breed: 'German Shepherd',
      type: 'dog',
      age: '1 year',
      image: 'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95',
      description: 'Smart and protective German Shepherd puppy, great with families.',
      gender: 'Male',
      weight: '25 kg',
      vaccinated: true,
      neutered: false,
      temperament: ['Intelligent', 'Protective', 'Trainable'],
      requirements: ['Training commitment', 'Large space', 'Active family']
    },
    {
      id: 4,
      name: 'Milo',
      breed: 'British Shorthair',
      type: 'cat',
      age: '4 years',
      image: 'https://images.unsplash.com/photo-1513245543132-31f507417b26',
      description: 'Calm and independent British Shorthair, perfect for apartment living.',
      gender: 'Male',
      weight: '5 kg',
      vaccinated: true,
      neutered: true,
      temperament: ['Independent', 'Quiet', 'Good with other cats'],
      requirements: ['Indoor home', 'Cat-friendly home', 'Regular play time']
    },
    {
      id: 5,
      name: 'Bella',
      breed: 'Labrador Retriever',
      type: 'dog',
      age: '6 months',
      image: 'https://images.unsplash.com/photo-1591160690555-5debfba289f0',
      description: 'Playful Labrador puppy with lots of energy and love to give.',
      gender: 'Female',
      weight: '15 kg',
      vaccinated: true,
      neutered: false,
      temperament: ['Playful', 'Energetic', 'Good with everyone'],
      requirements: ['Time for training', 'Exercise space', 'Patient family']
    },
    {
      id: 6,
      name: 'Oliver',
      breed: 'Maine Coon',
      type: 'cat',
      age: '2 years',
      image: 'https://images.unsplash.com/photo-1615789591457-74a63395c990',
      description: 'Majestic Maine Coon with a gentle giant personality.',
      gender: 'Male',
      weight: '7 kg',
      vaccinated: true,
      neutered: true,
      temperament: ['Gentle giant', 'Social', 'Dog-like personality'],
      requirements: ['Large space', 'Regular grooming', 'Interactive play']
    }
  ];

  const filteredPets = availablePets.filter(pet => {
    const matchesFilter = activeFilter === 'all' || pet.type === activeFilter;
    const matchesSearch = pet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         pet.breed.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handlePetSelection = (pet) => {
    setSelectedPet(pet);
    setFormData(prev => ({
      ...prev,
      preferredPet: pet.type
    }));
  };

  const openModal = (pet) => {
    setModalPet(pet);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setModalPet(null);
    document.body.style.overflow = 'unset';
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Prepare the application data
      const applicationData = {
        ...formData,
        selectedPet: selectedPet ? {
          id: selectedPet.id,
          name: selectedPet.name,
          breed: selectedPet.breed,
          type: selectedPet.type
        } : null
      };

      // Save the application
      const savedApplication = await saveApplication(applicationData);
      
      // Show success message
      alert('Thank you for submitting your adoption application! Your application ID is: ' + savedApplication.id);
      
      // Navigate to home page
      navigate('/');
    } catch (error) {
      alert('Failed to submit application. Please try again.');
      console.error('Error submitting application:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackClick = () => {
    navigate('/');
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  return (
    <Section>
      <BackButton
        onClick={handleBackClick}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path fillRule="evenodd" d="M11.03 3.97a.75.75 0 010 1.06l-6.22 6.22H21a.75.75 0 010 1.5H4.81l6.22 6.22a.75.75 0 11-1.06 1.06l-7.5-7.5a.75.75 0 010-1.06l7.5-7.5a.75.75 0 011.06 0z" clipRule="evenodd" />
        </svg>
      </BackButton>

      <Container>
        <Title
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Pet Adoption Application
        </Title>

        <AvailablePetsSection
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 style={{ 
            fontSize: '2rem', 
            color: '#fff', 
            marginBottom: '1rem',
            fontFamily: 'Kaushan Script',
            textAlign: 'center'
          }}>
            Available Pets for Adoption
          </h2>

          <SearchBar
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <input
              type="text"
              placeholder="Search by name or breed..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z" clipRule="evenodd" />
            </svg>
          </SearchBar>

          <FilterSection
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <FilterButton
              active={activeFilter === 'all'}
              onClick={() => setActiveFilter('all')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
              </svg>
              All Pets
            </FilterButton>
            <FilterButton
              active={activeFilter === 'dog'}
              onClick={() => setActiveFilter('dog')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8.25 10.875a2.625 2.625 0 115.25 0 2.625 2.625 0 01-5.25 0z" />
                <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.125 4.5a4.125 4.125 0 102.338 7.524l2.007 2.006a.75.75 0 101.06-1.06l-2.006-2.007a4.125 4.125 0 00-3.399-6.463z" clipRule="evenodd" />
              </svg>
              Dogs Only
            </FilterButton>
            <FilterButton
              active={activeFilter === 'cat'}
              onClick={() => setActiveFilter('cat')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-2.625 6c-.54 0-.828.419-.936.634a1.96 1.96 0 00-.189.866c0 .298.059.605.189.866.108.215.395.634.936.634.54 0 .828-.419.936-.634.13-.26.189-.568.189-.866 0-.298-.059-.605-.189-.866-.108-.215-.395-.634-.936-.634zm4.314.634c.108-.215.395-.634.936-.634.54 0 .828.419.936.634.13.26.189.568.189.866 0 .298-.059.605-.189.866-.108.215-.395.634-.936.634-.54 0-.828-.419-.936-.634a1.96 1.96 0 01-.189-.866c0-.298.059-.605.189-.866zm2.023 6.828a.75.75 0 10-1.06-1.06 3.75 3.75 0 01-5.304 0 .75.75 0 00-1.06 1.06 5.25 5.25 0 007.424 0z" clipRule="evenodd" />
              </svg>
              Cats Only
            </FilterButton>
          </FilterSection>

          <PetsGrid>
            {filteredPets.map((pet) => (
              <PetCard
                key={pet.id}
                isSelected={selectedPet?.id === pet.id}
                onClick={() => handlePetSelection(pet)}
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <PetImage>
                  <img src={pet.image} alt={pet.name} />
                </PetImage>
                <PetInfo>
                  <PetName>{pet.name}</PetName>
                  <PetBreed>{pet.breed} • {pet.age}</PetBreed>
                  <PetDescription>{pet.description}</PetDescription>
                  <Button
                    as="div"
                    onClick={(e) => {
                      e.stopPropagation();
                      openModal(pet);
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{ marginTop: '1rem' }}
                  >
                    View Details
                  </Button>
                </PetInfo>
                {selectedPet?.id === pet.id && (
                  <SelectionBadge
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    Selected
                  </SelectionBadge>
                )}
              </PetCard>
            ))}
          </PetsGrid>
        </AvailablePetsSection>

        <Form onSubmit={handleSubmit}>
          <FormSection
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2>Personal Information</h2>
            <InputGroup>
              <label htmlFor="firstName">First Name *</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </InputGroup>
            <InputGroup>
              <label htmlFor="lastName">Last Name *</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </InputGroup>
            <InputGroup>
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </InputGroup>
            <InputGroup>
              <label htmlFor="phone">Phone Number *</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </InputGroup>
            <InputGroup>
              <label htmlFor="address">Home Address *</label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </InputGroup>
          </FormSection>

          <FormSection
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2>Living Situation</h2>
            <InputGroup>
              <label htmlFor="housingType">Type of Housing *</label>
              <select
                id="housingType"
                name="housingType"
                value={formData.housingType}
                onChange={handleChange}
                required
              >
                <option value="">Select housing type</option>
                <option value="house">House</option>
                <option value="apartment">Apartment</option>
                <option value="condo">Condo</option>
                <option value="other">Other</option>
              </select>
            </InputGroup>
            <InputGroup>
              <label>Do you have a yard? *</label>
              <RadioGroup>
                <label>
                  <input
                    type="radio"
                    name="hasYard"
                    value="yes"
                    checked={formData.hasYard === 'yes'}
                    onChange={handleChange}
                    required
                  />
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    name="hasYard"
                    value="no"
                    checked={formData.hasYard === 'no'}
                    onChange={handleChange}
                  />
                  No
                </label>
              </RadioGroup>
            </InputGroup>
          </FormSection>

          <FormSection
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2>Pet Experience</h2>
            <InputGroup>
              <label>Do you have other pets? *</label>
              <RadioGroup>
                <label>
                  <input
                    type="radio"
                    name="otherPets"
                    value="yes"
                    checked={formData.otherPets === 'yes'}
                    onChange={handleChange}
                    required
                  />
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    name="otherPets"
                    value="no"
                    checked={formData.otherPets === 'no'}
                    onChange={handleChange}
                  />
                  No
                </label>
              </RadioGroup>
            </InputGroup>
            <InputGroup>
              <label htmlFor="petExperience">Previous Pet Experience *</label>
              <textarea
                id="petExperience"
                name="petExperience"
                value={formData.petExperience}
                onChange={handleChange}
                placeholder="Please describe your experience with pets..."
                required
              />
            </InputGroup>
          </FormSection>

          <FormSection
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <h2>Adoption Preferences</h2>
            <InputGroup>
              <label htmlFor="preferredPet">Type of Pet You Want to Adopt *</label>
              <select
                id="preferredPet"
                name="preferredPet"
                value={formData.preferredPet}
                onChange={handleChange}
                required
              >
                <option value="">Select pet type</option>
                <option value="dog">Dog</option>
                <option value="cat">Cat</option>
                <option value="both">Either</option>
              </select>
            </InputGroup>
            <InputGroup>
              <label htmlFor="workSchedule">Work Schedule *</label>
              <textarea
                id="workSchedule"
                name="workSchedule"
                value={formData.workSchedule}
                onChange={handleChange}
                placeholder="Please describe your typical work schedule..."
                required
              />
            </InputGroup>
          </FormSection>

          <FormSection
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <h2>Agreements</h2>
            <InputGroup>
              <CheckboxGroup>
                <input
                  type="checkbox"
                  id="familyAgreement"
                  name="familyAgreement"
                  checked={formData.familyAgreement}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="familyAgreement">
                  All family members agree to this adoption *
                </label>
              </CheckboxGroup>
            </InputGroup>
            <InputGroup>
              <CheckboxGroup>
                <input
                  type="checkbox"
                  id="vetCare"
                  name="vetCare"
                  checked={formData.vetCare}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="vetCare">
                  I agree to provide proper veterinary care *
                </label>
              </CheckboxGroup>
            </InputGroup>
            <InputGroup>
              <label htmlFor="additionalInfo">Additional Information</label>
              <textarea
                id="additionalInfo"
                name="additionalInfo"
                value={formData.additionalInfo}
                onChange={handleChange}
                placeholder="Any additional information you'd like to share..."
              />
            </InputGroup>
          </FormSection>

          <Button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isSubmitting ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="animate-spin">
                  <path fillRule="evenodd" d="M4.755 10.059a7.5 7.5 0 0112.548-3.364l1.903 1.903h-3.183a.75.75 0 100 1.5h4.992a.75.75 0 00.75-.75V4.356a.75.75 0 00-1.5 0v3.18l-1.9-1.9A9 9 0 003.306 9.67a.75.75 0 101.45.388zm15.408 3.352a.75.75 0 00-.919.53 7.5 7.5 0 01-12.548 3.364l-1.902-1.903h3.183a.75.75 0 000-1.5H2.984a.75.75 0 00-.75.75v4.992a.75.75 0 001.5 0v-3.18l1.9 1.9a9 9 0 0015.059-4.035.75.75 0 00-.53-.918z" clipRule="evenodd" />
                </svg>
                Submitting...
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                </svg>
                Submit Application
              </>
            )}
          </Button>
        </Form>

        <AnimatePresence>
          {modalPet && (
            <PetDetailsModal
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
            >
              <ModalContent
                onClick={(e) => e.stopPropagation()}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ModalClose
                  onClick={closeModal}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
                  </svg>
                </ModalClose>
                <ModalImage>
                  <img src={modalPet.image} alt={modalPet.name} />
                </ModalImage>
                <ModalInfo>
                  <h2 style={{ 
                    fontSize: '2rem',
                    fontFamily: 'Kaushan Script',
                    marginBottom: '1rem'
                  }}>{modalPet.name}</h2>
                  <PetBreed>{modalPet.breed} • {modalPet.age}</PetBreed>
                  <PetDescription style={{ margin: '1rem 0' }}>{modalPet.description}</PetDescription>
                  
                  <PetStats>
                    <StatItem>
                      <h4>Gender</h4>
                      <p>{modalPet.gender}</p>
                    </StatItem>
                    <StatItem>
                      <h4>Weight</h4>
                      <p>{modalPet.weight}</p>
                    </StatItem>
                    <StatItem>
                      <h4>Vaccinated</h4>
                      <p>{modalPet.vaccinated ? 'Yes' : 'No'}</p>
                    </StatItem>
                    <StatItem>
                      <h4>Neutered</h4>
                      <p>{modalPet.neutered ? 'Yes' : 'No'}</p>
                    </StatItem>
                  </PetStats>

                  <div style={{ margin: '1.5rem 0' }}>
                    <h3 style={{ marginBottom: '0.5rem', opacity: 0.8 }}>Temperament</h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {modalPet.temperament.map((trait, index) => (
                        <span
                          key={index}
                          style={{
                            background: 'rgba(255, 255, 255, 0.1)',
                            padding: '0.5rem 1rem',
                            borderRadius: '15px',
                            fontSize: '0.9rem'
                          }}
                        >
                          {trait}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 style={{ marginBottom: '0.5rem', opacity: 0.8 }}>Adoption Requirements</h3>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                      {modalPet.requirements.map((req, index) => (
                        <li
                          key={index}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            marginBottom: '0.5rem'
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            style={{ width: '20px', height: '20px', color: '#ffb347' }}
                          >
                            <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                          </svg>
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button
                    onClick={() => {
                      handlePetSelection(modalPet);
                      closeModal();
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{ marginTop: '2rem' }}
                  >
                    Select for Adoption
                  </Button>
                </ModalInfo>
              </ModalContent>
            </PetDetailsModal>
          )}
        </AnimatePresence>
      </Container>
    </Section>
  );
};

export default AdoptionForm; 