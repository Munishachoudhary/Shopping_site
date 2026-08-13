import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  FaMobileAlt,
  FaLaptop,
  FaTv,
  FaTshirt,
  FaFemale,
  FaShoePrints,
  FaClock,
  FaBook,
  FaSpa,
} from "react-icons/fa";
import "../styles/CategorySidebar.css";

const categories = [
  { id: 1, name: "Mobiles", icon: <FaMobileAlt /> },
  { id: 2, name: "Laptops", icon: <FaLaptop /> },
  { id: 3, name: "Electronics", icon: <FaTv /> },
  { id: 4, name: "Men's Fashion", icon: <FaTshirt /> },
  { id: 5, name: "Women's Fashion", icon: <FaFemale /> },
  { id: 6, name: "Shoes", icon: <FaShoePrints /> },
  { id: 7, name: "Watches", icon: <FaClock /> },
  { id: 9, name: "Books", icon: <FaBook /> },
  { id: 11, name: "Beauty", icon: <FaSpa /> },
];

function CategorySidebar({ onCategorySelect }) {
  return (
    <Card className="category-sidebar">
      <Card.Body>
        <h4>Categories</h4>

        <div className="sidebar-categories">
          {categories.map((category) => (
            <div
              key={category.id}
              className="sidebar-category"
              onClick={() => onCategorySelect(category.name)}
            >
              <span className="sidebar-icon">{category.icon}</span>
              <span>{category.name}</span>
            </div>
          ))}
        </div>
      </Card.Body>
    </Card>
  );
}

export default CategorySidebar;