import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  navigate("/usuario/criar");

  return null;
};

export default Index;
