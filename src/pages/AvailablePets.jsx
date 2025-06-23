import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';

const Section = styled.section`
  min-height: 100vh;
  width: 100%;
  background: linear-gradient(135deg, ${props => props.theme.body} 0%, #1a1a1a 100%);
  padding: 2rem;
`;

const Container = styled.div`
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
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
`;

const FilterContainer = styled.div`
  margin-bottom: 3rem;
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

const FiltersGroup = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 2rem;
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

const PetsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const PetCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.3);
  }
`;

const PetImage = styled.div`
  width: 100%;
  height: 250px;
  overflow: hidden;
  position: relative;

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
  font-size: ${props => props.theme.fontxl};
  font-family: 'Kaushan Script';
  margin-bottom: 0.5rem;
`;

const PetDetails = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin: 1rem 0;
`;

const Detail = styled.span`
  background: rgba(255, 255, 255, 0.1);
  padding: 0.5rem 1rem;
  border-radius: 15px;
  font-size: ${props => props.theme.fontsm};
  display: flex;
  align-items: center;
  gap: 0.5rem;

  svg {
    width: 16px;
    height: 16px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
`;

const Button = styled(motion.button)`
  padding: 0.8rem 1.5rem;
  background: ${props => props.secondary ? 
    'rgba(255, 255, 255, 0.1)' : 
    'linear-gradient(90deg, #ffb347, #ffcc33)'
  };
  border: none;
  border-radius: 20px;
  color: ${props => props.secondary ? props.theme.text : props.theme.body};
  font-size: ${props => props.theme.fontmd};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex: 1;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    background: ${props => props.secondary ? 
      'rgba(255, 255, 255, 0.15)' : 
      'linear-gradient(90deg, #ffcc33, #ffb347)'
    };
  }
`;

const BackButton = styled(motion.button)`
  position: fixed;
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

  svg {
    width: 24px;
    height: 24px;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: scale(1.1);
  }
`;

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
  // ... Add more pets here
];

const AvailablePets = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  const filteredPets = availablePets.filter(pet => {
    const matchesSearch = 
      pet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pet.breed.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || pet.type === selectedType;
    return matchesSearch && matchesType;
  });

  const handleBackClick = () => {
    navigate(-1);
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
          Available Pets
        </Title>

        <FilterContainer>
          <SearchBar
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
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

          <FiltersGroup
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <FilterButton
              active={selectedType === 'all'}
              onClick={() => setSelectedType('all')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              All Pets
            </FilterButton>
            <FilterButton
              active={selectedType === 'dog'}
              onClick={() => setSelectedType('dog')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Dogs
            </FilterButton>
            <FilterButton
              active={selectedType === 'cat'}
              onClick={() => setSelectedType('cat')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Cats
            </FilterButton>
          </FiltersGroup>
        </FilterContainer>

        <PetsGrid
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {filteredPets.map((pet) => (
            <PetCard
              key={pet.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <PetImage>
                <img src={pet.image} alt={pet.name} />
              </PetImage>
              <PetInfo>
                <PetName>{pet.name}</PetName>
                <PetDetails>
                  <Detail>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-2.625 6c-.54 0-.828.419-.936.634a1.96 1.96 0 00-.189.866c0 .298.059.605.189.866.108.215.395.634.936.634.54 0 .828-.419.936-.634.13-.26.189-.568.189-.866 0-.298-.059-.605-.189-.866-.108-.215-.395-.634-.936-.634zm4.314.634c.108-.215.395-.634.936-.634.54 0 .828.419.936.634.13.26.189.568.189.866 0 .298-.059.605-.189.866-.108.215-.395.634-.936.634-.54 0-.828-.419-.936-.634a1.96 1.96 0 01-.189-.866c0-.298.059-.605.189-.866zm2.023 6.828a.75.75 0 10-1.06-1.06 3.75 3.75 0 01-5.304 0 .75.75 0 00-1.06 1.06 5.25 5.25 0 007.424 0z" clipRule="evenodd" />
                    </svg>
                    {pet.breed}
                  </Detail>
                  <Detail>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12.75 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM7.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM8.25 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM9.75 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM10.5 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM12.75 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM14.25 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 13.5a.75.75 0 100-1.5.75.75 0 000 1.5z" />
                      <path fillRule="evenodd" d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z" clipRule="evenodd" />
                    </svg>
                    {pet.age}
                  </Detail>
                  <Detail>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-4.125 9.75a.75.75 0 01.75-.75h6.75a.75.75 0 010 1.5H8.625a.75.75 0 01-.75-.75z" clipRule="evenodd" />
                    </svg>
                    {pet.weight}
                  </Detail>
                </PetDetails>
                <ButtonGroup>
                  <Button
                    as={Link}
                    to={`/adoption-form?pet=${pet.id}`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Adopt Now
                  </Button>
                  <Button
                    secondary
                    as={Link}
                    to={`/pet/${pet.id}`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    View Details
                  </Button>
                </ButtonGroup>
              </PetInfo>
            </PetCard>
          ))}
        </PetsGrid>
      </Container>
    </Section>
  );
};

export default AvailablePets; 