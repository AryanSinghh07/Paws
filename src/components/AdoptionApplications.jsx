import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { getAllApplications } from '../services/adoptionService';
import LoadingSpinner from './LoadingSpinner';
import { FaSearch, FaFilter, FaSortAmountDown } from 'react-icons/fa';

const Container = styled.div`
  width: 100%;
  margin-top: 2rem;
`;

const Title = styled.h2`
  font-size: ${props => props.theme.fontxxl};
  font-family: 'Kaushan Script';
  color: #000000;
  margin-bottom: 2rem;
  font-weight: 700;
  position: relative;
  display: inline-block;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 100%;
    height: 3px;
    background: linear-gradient(135deg, #FFB347 0%, #FFCC33 100%);
    border-radius: 3px;
  }
`;

const ApplicationsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
`;

const ApplicationCard = styled(motion.div)`
  background: linear-gradient(145deg, #FFFFFF, #F8F8F8);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  padding: 2.5rem;
  border: 1px solid #E0E0E0;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #FFB347, #FFCC33, #FFB347);
    background-size: 200% 100%;
    animation: gradientMove 3s linear infinite;
  }

  @keyframes gradientMove {
    0% { background-position: 0% 0%; }
    100% { background-position: 200% 0%; }
  }
  
  &:hover {
    background: linear-gradient(145deg, #FFFFFF, #FAFAFA);
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
    border-color: #FFB347;
  }
  
  h3 {
    font-size: ${props => props.theme.fontlg};
    color: #000000;
    margin-bottom: 1.5rem;
    font-weight: 700;
    letter-spacing: 0.8px;
    display: inline-block;
    position: relative;
    
    &:after {
      content: '';
      position: absolute;
      bottom: -4px;
      left: 0;
      width: 100%;
      height: 2px;
      background: linear-gradient(90deg, #FFB347, #FFCC33);
      border-radius: 2px;
      opacity: 0.7;
    }
  }
`;

const StatusBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.2rem;
  border-radius: 30px;
  font-size: ${props => props.theme.fontsm};
  font-weight: 600;
  margin-bottom: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    transition: all 0.3s ease;
    
    ${props => {
      switch (props.status) {
        case 'pending':
          return `
            background: linear-gradient(135deg, rgba(255, 179, 71, 0.15), rgba(255, 204, 51, 0.15));
            border: 2px solid #FFB347;
          `;
        case 'approved':
          return `
            background: linear-gradient(135deg, rgba(75, 181, 67, 0.15), rgba(56, 161, 105, 0.15));
            border: 2px solid #4BB543;
          `;
        case 'rejected':
          return `
            background: linear-gradient(135deg, rgba(255, 71, 71, 0.15), rgba(229, 62, 62, 0.15));
            border: 2px solid #FF4747;
          `;
        default:
          return `
            background: linear-gradient(135deg, rgba(160, 174, 192, 0.15), rgba(113, 128, 150, 0.15));
            border: 2px solid #A0AEC0;
          `;
      }
    }}
    border-radius: inherit;
  }

  ${props => {
    switch (props.status) {
      case 'pending':
        return `color: #FFB347;`;
      case 'approved':
        return `color: #4BB543;`;
      case 'rejected':
        return `color: #FF4747;`;
      default:
        return `color: #A0AEC0;`;
    }
  }}

  &:hover {
    transform: translateY(-1px);
    &:before {
      filter: brightness(1.2);
    }
  }

  &:after {
    content: '${props => props.status === 'pending' ? '⏳' : props.status === 'approved' ? '✓' : props.status === 'rejected' ? '✕' : '•'}';
    font-size: 0.9em;
    margin-left: 0.2rem;
  }
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding: 0.8rem;
  font-size: ${props => props.theme.fontmd};
  border-radius: 12px;
  background: #F5F5F5;
  transition: all 0.3s ease;
  
  &:hover {
    background: #EBEBEB;
    transform: translateX(5px);
  }
  
  span:first-child {
    color: #666666;
    font-weight: 600;
    letter-spacing: 0.8px;
    text-transform: uppercase;
    font-size: 0.9em;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    
    &:before {
      content: '';
      display: inline-block;
      width: 6px;
      height: 6px;
      background: linear-gradient(135deg, #FFB347, #FFCC33);
      border-radius: 50%;
    }
  }
  
  span:last-child {
    color: #FFB347;
    font-weight: 600;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    background: linear-gradient(90deg, #FFB347, #FFCC33);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    padding: 0.2rem 0.8rem;
    border-radius: 20px;
    position: relative;
    
    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(255, 179, 71, 0.1);
      border-radius: inherit;
      z-index: -1;
    }
  }
`;

const PetInfo = styled.div`
  margin-top: 2rem;
  padding: 1.5rem;
  border-radius: 15px;
  background: linear-gradient(145deg, rgba(255, 215, 0, 0.05), rgba(255, 179, 71, 0.05));
  border: 1px solid rgba(255, 215, 0, 0.1);
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  
  &:before {
    content: '🐾';
    position: absolute;
    top: -15px;
    right: -15px;
    font-size: 5rem;
    opacity: 0.1;
    transform: rotate(15deg);
    transition: all 0.3s ease;
  }
  
  &:hover {
    transform: translateY(-5px);
    background: linear-gradient(145deg, rgba(255, 215, 0, 0.08), rgba(255, 179, 71, 0.08));
    border-color: rgba(255, 215, 0, 0.2);
    
    &:before {
      transform: rotate(30deg) scale(1.2);
      opacity: 0.15;
    }
    
    h4 {
      &:after {
        width: 100%;
        background: linear-gradient(90deg, #FFD700, #FFB347);
      }
    }
  }
  
  h4 {
    font-size: ${props => props.theme.fontlg};
    color: #000000;
    margin-bottom: 1.5rem;
    font-weight: 700;
    letter-spacing: 1px;
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    
    &:before {
      content: '🐾';
      font-size: 1.2em;
      margin-right: 0.5rem;
    }
    
    &:after {
      content: '';
      position: absolute;
      bottom: -6px;
      left: 0;
      width: 50%;
      height: 3px;
      background: linear-gradient(90deg, #FFD700, transparent);
      border-radius: 3px;
      transition: all 0.3s ease;
    }
  }
`;

const NoApplications = styled(motion.div)`
  text-align: center;
  padding: 4rem 3rem;
  background: linear-gradient(145deg, #FFFFFF, #F8F8F8);
  border-radius: 30px;
  color: #666666;
  font-size: ${props => props.theme.fontlg};
  border: 2px dashed #FFB347;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;

  h3 {
    color: #000000;
    font-size: ${props => props.theme.fontxxl};
    font-weight: 700;
    margin-bottom: 1rem;
    position: relative;
    display: inline-block;
    
    &:after {
      content: '';
      position: absolute;
      bottom: -6px;
      left: 0;
      width: 100%;
      height: 3px;
      background: linear-gradient(90deg, #FFB347, #FFCC33);
      border-radius: 2px;
    }
  }
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at center, rgba(255, 179, 71, 0.1) 0%, transparent 70%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover {
    border-color: rgba(255, 179, 71, 0.5);
    transform: translateY(-5px);
    
    &:before {
      opacity: 1;
    }
    
    .paw-icon {
      transform: rotate(15deg) scale(1.1);
      opacity: 0.9;
    }
  }
  
  .paw-icon {
    font-size: 5rem;
    margin-bottom: 2rem;
    display: inline-block;
    opacity: 0.7;
    transition: all 0.3s ease;
    background: linear-gradient(135deg, #FFB347, #FFCC33);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
  }
  
  h3 {
    font-size: ${props => props.theme.fontxl};
    margin-bottom: 1rem;
    background: linear-gradient(135deg, #FFB347, #FFCC33);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: 700;
  }
  
  p {
    margin-bottom: 2rem;
    line-height: 1.6;
    max-width: 500px;
    margin: 0 auto 2rem;
  }
  
  button {
    padding: 1rem 2.5rem;
    background: linear-gradient(135deg, #FFB347, #FFCC33);
    border: none;
    border-radius: 25px;
    color: #1a1a1a;
    font-weight: 600;
    font-size: ${props => props.theme.fontmd};
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(255, 179, 71, 0.3);
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(255, 179, 71, 0.4);
      background: linear-gradient(135deg, #FFCC33, #FFB347);
    }
  }
`;

const SearchAndFilterBar = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const SearchInput = styled.div`
  flex: 1;
  position: relative;
  min-width: 200px;

  input {
    width: 100%;
    padding: 1rem 3rem 1rem 1.5rem;
    background: #FFFFFF;
    border: 1px solid #E0E0E0;
    border-radius: 15px;
    color: #333333;
    font-size: ${props => props.theme.fontmd};

    &:focus {
      outline: none;
      border-color: #ffb347;
    }
  }

  svg {
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: ${props => props.theme.text};
    opacity: 0.5;
  }
`;

const FilterButton = styled(motion.button)`
  padding: 1rem 2rem;
  background: #FFFFFF;
  border: 1px solid #E0E0E0;
  border-radius: 15px;
  color: #333333;
  font-size: ${props => props.theme.fontmd};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #F5F5F5;
    border-color: #D0D0D0;
  }

  svg {
    opacity: 0.7;
  }

  ${props => props.active && `
    background: rgba(255, 179, 71, 0.2);
    border-color: #ffb347;
    color: #ffb347;

    svg {
      opacity: 1;
    }
  `}
`;

const FilterDropdown = styled(motion.div)`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 0.5rem;
  background: #FFFFFF;
  border: 1px solid #E0E0E0;
  border-radius: 15px;
  padding: 1rem;
  min-width: 200px;
  z-index: 10;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

const FilterOption = styled.div`
  padding: 0.8rem 1rem;
  cursor: pointer;
  border-radius: 10px;
  transition: all 0.3s ease;
  color: #333333;

  &:hover {
    background: #F5F5F5;
  }

  ${props => props.selected && `
    background: rgba(255, 179, 71, 0.2);
    color: #ffb347;
    font-weight: 600;
  `}
`;

const AdoptionApplications = () => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [showFilters, setShowFilters] = useState(false);
  const [showSort, setShowSort] = useState(false);

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = () => {
    try {
      const apps = getAllApplications();
      setApplications(apps);
    } catch (error) {
      console.error('Error loading applications:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const filterApplications = () => {
    let filtered = [...applications];

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(app => 
        app.firstName.toLowerCase().includes(query) ||
        app.lastName.toLowerCase().includes(query) ||
        app.selectedPet?.name.toLowerCase().includes(query)
      );
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(app => app.status === statusFilter);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'name':
          return `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`);
        case 'status':
          return a.status.localeCompare(b.status);
        default:
          return 0;
      }
    });

    return filtered;
  };

  if (loading) {
    return <LoadingSpinner text="Loading adoption applications..." />;
  }

  const filteredApplications = filterApplications();

  if (applications.length === 0) {
    return (
      <Container>
        <Title>My Adoption Applications</Title>
              <NoApplications
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span className="paw-icon">🐾</span>
        <h3>No Applications Yet</h3>
        <p>You haven't submitted any adoption applications yet. Start your journey to find your perfect furry friend!</p>
        <button onClick={() => navigate('/pets')}>Browse Available Pets</button>
      </NoApplications>
      </Container>
    );
  }

  return (
    <Container>
      <Title>My Adoption Applications</Title>
      
      <SearchAndFilterBar>
        <SearchInput>
          <input
            type="text"
            placeholder="Search by name or pet..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FaSearch />
        </SearchInput>

        <div style={{ position: 'relative' }}>
          <FilterButton
            active={statusFilter !== 'all'}
            onClick={() => setShowFilters(!showFilters)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaFilter />
            Filter by Status
          </FilterButton>

          {showFilters && (
            <FilterDropdown
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <FilterOption
                selected={statusFilter === 'all'}
                onClick={() => {
                  setStatusFilter('all');
                  setShowFilters(false);
                }}
              >
                All Applications
              </FilterOption>
              <FilterOption
                selected={statusFilter === 'pending'}
                onClick={() => {
                  setStatusFilter('pending');
                  setShowFilters(false);
                }}
              >
                Pending
              </FilterOption>
              <FilterOption
                selected={statusFilter === 'approved'}
                onClick={() => {
                  setStatusFilter('approved');
                  setShowFilters(false);
                }}
              >
                Approved
              </FilterOption>
              <FilterOption
                selected={statusFilter === 'rejected'}
                onClick={() => {
                  setStatusFilter('rejected');
                  setShowFilters(false);
                }}
              >
                Rejected
              </FilterOption>
            </FilterDropdown>
          )}
        </div>

        <div style={{ position: 'relative' }}>
          <FilterButton
            onClick={() => setShowSort(!showSort)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaSortAmountDown />
            Sort By
          </FilterButton>

          {showSort && (
            <FilterDropdown
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <FilterOption
                selected={sortBy === 'date'}
                onClick={() => {
                  setSortBy('date');
                  setShowSort(false);
                }}
              >
                Date Submitted
              </FilterOption>
              <FilterOption
                selected={sortBy === 'name'}
                onClick={() => {
                  setSortBy('name');
                  setShowSort(false);
                }}
              >
                Applicant Name
              </FilterOption>
              <FilterOption
                selected={sortBy === 'status'}
                onClick={() => {
                  setSortBy('status');
                  setShowSort(false);
                }}
              >
                Application Status
              </FilterOption>
            </FilterDropdown>
          )}
        </div>
      </SearchAndFilterBar>

      {filteredApplications.length === 0 ? (
        <NoApplications
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="paw-icon">🔍</span>
          <h3>No Matches Found</h3>
          <p>No applications match your search criteria. Try adjusting your filters or search terms.</p>
          <button onClick={() => {
            setSearchQuery('');
            setStatusFilter('all');
            setSortBy('date');
          }}>Clear Filters</button>
        </NoApplications>
      ) : (
        <ApplicationsGrid>
          {filteredApplications.map((application) => (
            <ApplicationCard
              key={application.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <StatusBadge status={application.status}>
                {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
              </StatusBadge>
              
              <h3>Application #{application.id}</h3>
              
              <InfoRow>
                <span>Submitted On</span>
                <span>{formatDate(application.createdAt)}</span>
              </InfoRow>
              
              <InfoRow>
                <span>Name</span>
                <span>{application.firstName} {application.lastName}</span>
              </InfoRow>
              
              <InfoRow>
                <span>Housing</span>
                <span>{application.housingType}</span>
              </InfoRow>
              
              {application.selectedPet && (
                <PetInfo>
                  <h4>Selected Pet</h4>
                  <InfoRow>
                    <span>Name</span>
                    <span>{application.selectedPet.name}</span>
                  </InfoRow>
                  <InfoRow>
                    <span>Breed</span>
                    <span>{application.selectedPet.breed}</span>
                  </InfoRow>
                  <InfoRow>
                    <span>Type</span>
                    <span>{application.selectedPet.type}</span>
                  </InfoRow>
                </PetInfo>
              )}
            </ApplicationCard>
          ))}
        </ApplicationsGrid>
      )}
    </Container>
  );
};

export default AdoptionApplications; 