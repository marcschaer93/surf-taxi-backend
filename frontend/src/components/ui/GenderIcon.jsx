import FemaleSharpIcon from "@mui/icons-material/FemaleSharp"; // Import icons as needed
import MaleSharpIcon from "@mui/icons-material/MaleSharp";
import TransgenderIcon from "@mui/icons-material/Transgender"; // Example icon for non-binary or prefer not to say

// Function to return the correct icon based on gender

export const GenderIcon = ({ gender }) => {
  switch (gender) {
    case "female":
      return <FemaleSharpIcon sx={{ mr: 1 }} />;
    case "male":
      return <MaleSharpIcon sx={{ mr: 1 }} />;
    case "non-binary":
    case "prefer not to say":
    default:
      return <TransgenderIcon sx={{ mr: 1 }} />;
  }
};
