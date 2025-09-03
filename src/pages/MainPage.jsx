import HeroSection from '../components/HeroSection';
import SobreNosotros from '../components/SobreNosotros';
import Mundial2026 from '../components/Mundial2026';
import CatalogoArgentina from '../components/CatalogoArgentina';
import PortfolioGaleria from '../components/PortfolioGaleria';
import Servicios from '../components/Servicios';
import Contacto from '../components/Contacto';
import Footer from '../components/Footer';
import Testimonios from '../components/Testimonios';
import { Box } from '@mui/material';

const MainPage = () => (
  <>
    <Box>
  <HeroSection />
  <Servicios />
  <SobreNosotros />
  <Mundial2026 />
  <CatalogoArgentina />
  <PortfolioGaleria />
  <Contacto />
  <Testimonios />
    </Box>
    <Footer />
  </>
);

export default MainPage;
