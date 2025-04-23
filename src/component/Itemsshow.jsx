import React from "react";
import FoodItem from "./FoodItem";  // Import FoodItem component
import { useCart } from "../component/CartContext";  // Import useCart from context

const Itemsshow = () => {
  const { addToCart } = useCart();  // Get addToCart from context


  const menuItems = [
    {
      name: "Choila",
      image: "images/Buffchoila.jpg",
      description: "A spicy and flavorful dish made with marinated meat, served with rice.",
      types: [
        { name: "Buff", price: 180 },
        { name: "Chicken", price: 200 },
        { name: "Pork", price: 220 },
      ],
      desc: "8 pieces per plate",
    },
    {
      name: "Kachila",
      image: "images/kachila.jpg",
      description: "A traditional raw minced meat dish mixed with spices and herbs.",
      types: [
        { name: "Buff", price: 180 },
        { name: "Chicken", price: 200 },
        { name: "Pork", price: 220 },
      ],
    },
    {
      name: "Dyaakula",
      image: "images/dyaakula.jpg",
      description: "A flavorful stew made from slow-cooked meat.",
      types: [{ name: "Buff", price: 250 }],
      desc: "1 bowl : 4 pieces of meat",
    },
    {
      name: "Sekuwa",
      image: "images/sekuwa.jpg",
      description: "Grilled meat marinated with spices, usually served with chutney.",
      types: [
        { name: "Buff", price: 40 },
        { name: "Chicken", price: 60 },
        { name: "Pork", price: 80 },
      ],
      desc: "6 pieces per stick",
    },
    {
      name: "Meatball(Laapichaa)",
      image: "images/Meatball.jpg",
      description: "Newari-style meatballs made from minced meat and spices.",
      types: [{ name: "Buff", price: 250 }],
      desc: "5 pieces per plate",
    },
    {
      name: "Sapubhichaa",
      image: "images/sapu.jpg",
      description: "Tender marinated buffalo or goat meat cooked with aromatic spices for a rich, savory taste.",
      types: [
        { name: "Buff", price: 250 },
        { name: "Goat", price: 250 },
      ],
      desc: "5 pieces per plate",
    },
    {
      name: "Takha",
      image: "images/takha.webp",
      description: "Nepali dish made from boiled meat, mixed with a tangy, spiced yogurt-based gravy, perfect for a refreshing and flavorful meal.",
      types: [{ name: "Buff", price: 150 }],
    },
    {
      name: "FishFry",
      image: "images/fishfry.jpg",
      description: "Crispy, golden-brown fried fish fillets seasoned with a blend of spices, perfect for a savory, crunchy delight.",
      types: [{ name: "Mackerel", price: 300 }],
      desc: "5 pieces per plate",
    },
    {
      name: "Bhutan",
      image: "images/bhutan.png",
      description: "The goat meat is deep-fried until crispy, then seasoned with Newari achar masala.",
      types: [{ name: "Goat", price: 150 }],
      desc: "10 pieces per plate",
    },
    {
      name: "Mushroom Choila",
      image: "images/mushroom.jpg",
      description: "Mushroom Choila is marinated in a blend of aromatic spices, mustard oil, garlic, and ginger, then grilled or pan-fried to perfection.",
      types: [{ name: "Mushroom", price: 180 }],
    },
    {
      name: "Wo",
      image: "images/wo.jpg",
      description: "Roti made in Newari style using Lentils.",
      types: [{ name: "Lentils", price: 40 }],
    },
    {
      name: "Chatamari",
      image: "images/chatamari.webp",
      description: "Thin roti made in Newari style using rice flour.",
      types: [
        { name: "Plain", price: 40 },
        { name: "With egg", price: 80 },
        { name: "With meat", price: 100 },
        { name: "With egg and meat", price: 150 },
        { name: "Mix", price: 180 },
      ],
    },
    {
      name: "Aalu Tama",
      image: "images/aalutama.jpg",
      description: "Nepali dish made with potatoes (Aalu) and bamboo shoots (Tama).",
      types: [{ name: "Plain", price: 40 }],
    },
    {
      name: "Bhatmas And Gundruk Sadeko",
      image: "images/bhatmas.jpg",
      description: "This dish features roasted soybeans mixed with gundruk, spices, and herbs, offering a crunchy and savory snack.",
      types: [
        { name: "Bhatmas", price: 50 },
        { name: "Gundruk", price: 50 },
        { name: "Both", price: 100 },
      ],
    },
    {
      name: "Kwati",
      image: "images/kwati.jpg",
      description: "Soup made from a mix of sprouted beans, including lentils, peas, and soybeans. It’s usually spiced with garlic, ginger, and local herbs, making it a wholesome and nutritious dish.",
      types: [{ name: "Mixed beans", price: 150 }],
    },
    {
      name: "Laalmon",
      image: "images/Laalmon.jpeg",
      description: "Laalmon is a deep-fried, sugar-soaked sweet similar to Rasbari but with a firmer texture and a deep reddish-brown color.",
      types: [{ name: "Plain", price: 50 }],
    },
    {
      name: "Rasbari",
      image: "images/rasbari.jpg",
      description: "Rasbari is a soft, spongy, and syrup-soaked milk-based sweet, similar to the Indian Rasgulla.",
      types: [{ name: "Plain", price: 80 }],
    },
    {
      name: "Barfi",
      image: "images/barfi.jpeg",
      description: "Barfi is a dense, milk-based sweet that comes in various flavors, such as coconut, chocolate, and pistachio.",
      types: [{ name: "Plain", price: 80 }],
    },
    {
      name: "Jerry",
      image: "images/jerry.jpeg",
      description: "Jerry, also known as Jalebi, is a deep-fried, spiral-shaped sweet soaked in sugar syrup.",
      types: [{ name: "Plain", price: 80 }],
    },
    {
      name: "Lakhamari",
      image: "images/lakhamari.webp",
      description: "Lakhamari is a traditional Newari sweet known for its hard, crunchy texture and mildly sweet taste. Made from flour, sugar, and ghee, this delicacy comes in different shapes and sizes.",
      types: [{ name: "Plain", price: 80 }],
    },
    {
      name: "Juju Dhau",
      image: "images/juju.webp",
      description: "Juju Dhau, meaning King of Yogurt, is a creamy, rich, and sweet yogurt from Bhaktapur.",
      types: [{ name: "Plain", price: 80 }],
    },
    {
      name: "Yomari",
      image: "images/yomari.png",
      description: "This steamed dumpling is made from rice flour and filled with sweet molasses (chaku) or khuwa (milk solids).",
      types: [
        { name: "Chaku", price: 70 },
        { name: "Khuwa", price: 80 },
      ],
    },
    {
      name: "Tho",
      image: "images/tho.jpg",
      description: "Tho is a traditional alcoholic beverage made from fermented rice, milky, slightly sweet, and mildly alcoholic drink.",
      types: [{ name: "Plain", price: 100 }],
      desc: "Per litre 100",
    },
    {
      name: "Aela",
      image: "images/local.jpeg",
      description: "Aela is a traditional homemade alcoholic beverage in Nepal, distilled from grains like rice, millet, or barley.",
      types: [{ name: "Plain", price: 120 }],
      desc: "Per litre 120",
    },
    {
      name: "Beer",
      image: "images/beer.webp",
      types: [
        { name: "Nepal Ice", price: 250 },
        { name: "Gorkha", price: 300 },
        { name: "Tuborg", price: 450 },
        { name: "Kasberg", price: 450 },
      ],
    },
    {
      name: "Lassi",
      image: "images/lassi.jpg",
      description: "Lassi is a refreshing yogurt-based drink enjoyed across Nepal. It can be served sweet, flavored with sugar, cardamom, and nuts, or as a salty version with a hint of spices.",
      types: [
        { name: "Plain", price: 70 },
        { name: "With Almonds", price: 80 },
        { name: "With Almonds and khuwa", price: 100 },
      ],
      desc: "Per glass 100",
    },
    {
      name: "Cold Drinks",
      image: "images/coke.webp",
      types: [
        { name: "Coke", price: 80 },
        { name: "Fanta", price: 80 },
        { name: "Sprite", price: 80 },
        { name: "Slice", price: 70 },
      ],
    },
    {
      name: "Khaja Set",
      image: "images/Wholeitem.png",
      description: "Non-veg: Baji(Chiura), Spinach, Beans, Choila, Aalu Tama, Bhatmas Sadeko, Mix Achar. Veg: Baji(Chiura), Spinach, Beans, Mushroom Choila, Aalu Tama, Bhatmas Sadeko, Mix Achar, Aalu Sadeko.",
      types: [
        { name: "Non-Veg", price: 700 },
        { name: "Veg", price: 500 },
      ],
    },
    
   
  ];

  return (
    <div className="row row-cols-1 row-cols-md-3 py-5 g-4">
      {menuItems.map((item, index) => (
        <FoodItem
          key={index}
          {...item}
          addToCart={addToCart}  // Pass addToCart function to FoodItem
        />
      ))}
    </div>
  );
};

export default Itemsshow;
