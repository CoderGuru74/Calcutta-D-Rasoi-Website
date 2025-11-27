export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'starter' | 'veg' | 'non-veg' | 'dessert' | 'drinks';
  image: string; // Now contains your file names
}

// --- UPDATED: AUTHENTIC BENGALI & NORTH INDIAN RESTAURANT MENU ---
export const restaurantMenu: MenuItem[] = [
  // --- STARTERS (Veg) ---
  { id: 'r1', name: 'French Fries', description: 'Classic salted potato fries.', price: 100, category: 'starter', image: 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg' },
  { id: 'r2', name: 'Baby Corn', description: 'Crispy fried baby corn.', price: 180, category: 'starter', image: 'https://images.pexels.com/photos/2474658/pexels-photo-2474658.jpeg' },
  { id: 'r3', name: 'Veg Manchurian Dry', description: 'Fried vegetable balls tossed in dry Manchurian sauce.', price: 150, category: 'starter', image: 'Dry machurian.jpg' },
  { id: 'r4', name: 'Paneer Pakoda', description: 'Cottage cheese fritters.', price: 160, category: 'starter', image: 'Panneer pakoda.jpg' },
  
  // --- STARTERS (Non-Veg - Chicken) ---
  { id: 'r5', name: 'Chicken Pakoda', description: 'Chicken fritters.', price: 120, category: 'starter', image: 'Chicken Pakod.jpg' },
  { id: 'r6', name: 'Chicken Lollipop', description: 'Fried chicken drumsticks.', price: 180, category: 'starter', image: 'Chicken lolipop.jpg' },
  { id: 'r7', name: 'Chicken Cutlet', description: 'Crispy breaded chicken cutlet.', price: 160, category: 'starter', image: 'Chicken cutlet.jpg' },
  { id: 'r8', name: 'Dragon Chicken', description: 'Spicy shredded chicken starter.', price: 190, category: 'starter', image: 'Dragon chicken.jpg' },
  
  // --- STARTERS (Non-Veg - Fish) ---
  { id: 'r9', name: 'Fish Cutlet (2 Pcs)', description: 'Traditional Bengali fish cutlets.', price: 160, category: 'starter', image: 'Fish cutlet.jpg' },
  { id: 'r10', name: 'Golden Prawn', description: 'Crispy fried prawns.', price: 300, category: 'starter', image: 'Golden Prawn.jpg' },
  
  // --- MAIN COURSE (Veg) ---
  { id: 'r11', name: 'Paneer Butter Masala (F/H)', description: 'Creamy paneer curry.', price: 220, category: 'veg', image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg' },
  { id: 'r12', name: 'Kashmiri Allu Dum', description: 'Spicy potato curry from Kashmir.', price: 120, category: 'veg', image: 'Kashmiri Aloo dum.jpg' },
  { id: 'r13', name: 'Dal Makhani', description: 'Rich creamy lentil preparation.', price: 170, category: 'veg', image: 'Dal makhni.jpg' },
  { id: 'r14', name: 'Mushroom Do Pyaza', description: 'Mushrooms cooked with onions and spices.', price: 220, category: 'veg', image: 'Mushroom do pyazza.jpg' },
  
  // --- MAIN COURSE (Non-Veg - Chicken & Mutton) ---
  { id: 'r15', name: 'Chicken Kossa (F/H)', description: 'Slow-cooked chicken curry, Bengali style.', price: 200, category: 'non-veg', image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg' },
  { id: 'r16', name: 'Chicken Butter Masala', description: 'Creamy chicken curry.', price: 250, category: 'non-veg', image: 'Chicken butter masala.jpg' },
  { id: 'r17', name: 'Chicken Do Payza (F/H)', description: 'Chicken cooked with onions (Do Pyaza style).', price: 280, category: 'non-veg', image: 'Chicken Do pyaza.jpg' },
  { id: 'r18', name: 'Lemon Chicken', description: 'Chicken pieces in a tangy lemon sauce.', price: 190, category: 'non-veg', image: 'Lemon chicken.jpg' },
  { id: 'r19', name: 'Mutton Kossa', description: 'Rich, dry mutton curry (Bengali classic).', price: 330, category: 'non-veg', image: 'Mutton kossa.jpg' },
  { id: 'r20', name: 'Mutton Do Payaza', description: 'Mutton cooked with lots of onions.', price: 390, category: 'non-veg', image: 'Mutton do pyaza.jpg' },
  
  // --- TANDOORI BHATTI ---
  { id: 'r21', name: 'Tandoori Chicken (F/H)', description: 'Chicken marinated in yogurt and spices, grilled in tandoor.', price: 430, category: 'non-veg', image: 'Tandoori chicken.jpg' },
  { id: 'r22', name: 'Chicken Tikka Kabab (6 Pcs)', description: 'Boneless chicken marinated and grilled.', price: 250, category: 'non-veg', image: 'chiken tikka kabab.jpg' },
  { id: 'r23', name: 'Paneer Tikka Kabab (6 Pcs)', description: 'Grilled paneer, onion, and peppers.', price: 290, category: 'veg', image: 'Paneer tikka kabab.jpg' },
  { id: 'r24', name: 'Chicken Reshmi Butter Masala', description: 'Creamy, mild chicken kebab curry.', price: 280, category: 'non-veg', image: 'Chicken reshmi butter amsala.jpg' },
  
  // --- BIRYANI & RICE ---
  { id: 'r25', name: 'Chicken Biryani', description: 'Aromatic rice dish with marinated chicken.', price: 120, category: 'non-veg', image: 'Chicken Biryani.jpg' },
  { id: 'r26', name: 'Bamboo Biryani', description: 'Biryani cooked and served in a bamboo shoot.', price: 250, category: 'non-veg', image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg' },
  { id: 'r27', name: 'Veg Fried Rice', description: 'Wok-tossed rice with vegetables.', price: 130, category: 'veg', image: 'Veg fried Rice.jpg' },
  { id: 'r28', name: 'Basanti Pulao', description: 'Sweet, fragrant yellow pulao (Bengali festive dish).', price: 170, category: 'veg', image: 'Bsanti pulao.jpg' },
  
  // --- HAKKA NOODLES ---
  { id: 'r29', name: 'Veg Noodles', description: 'Wok-tossed noodles with vegetables.', price: 80, category: 'veg', image: 'Veg noodles.jpg' },
  { id: 'r30', name: 'Chicken Noodles', description: 'Wok-tossed noodles with chicken.', price: 100, category: 'non-veg', image: 'Chicken noodles.jpg' },
  { id: 'r31', name: 'Schezwan Noodles (Veg)', description: 'Spicy Schezwan sauce noodles.', price: 150, category: 'veg', image: 'Schezwan Noodles (Veg).jpg' },
  
  // --- MOMO / SOUP / ROLL ---
  { id: 'r32', name: 'Veg Steam Momo', description: 'Steamed vegetable dumplings.', price: 60, category: 'starter', image: 'Veg Steam Momo.jpg' },
  { id: 'r33', name: 'Chicken Steam Momo', description: 'Steamed chicken dumplings.', price: 60, category: 'starter', image: 'Chicken Steam Momo.jpg' },
  { id: 'r34', name: 'Chicken Soup', description: 'Classic clear chicken soup.', price: 149, category: 'drinks', image: 'Chicken Soup.jpg' },
  { id: 'r35', name: 'Egg Roll', description: 'Kolkata-style egg roll.', price: 60, category: 'starter', image: 'Egg Roll.jpg' },
  { id: 'r36', name: 'Chicken Roll', description: 'Kolkata-style chicken roll.', price: 90, category: 'starter', image: 'Chicken Roll.jpg' },

  // --- BREADS ---
  { id: 'r37', name: 'Butter Roti', description: 'Whole wheat bread with butter.', price: 12, category: 'veg', image: 'Butter Roti.jpg' },
  { id: 'r38', name: 'Plain Naan', description: 'Soft, leavened bread.', price: 45, category: 'veg', image: 'Plain Naan.jpg' },
  { id: 'r39', name: 'Garlic Naan', description: 'Naan flavored with garlic and cilantro.', price: 69, category: 'veg', image: 'Garlic Naan.jpg' },
  
  // --- DRINKS (Triggers switch to Cafe Mode) ---
  { id: 'r40', name: 'Assorted Drinks', description: 'Please switch to Cafe Mode for the full beverage list.', price: 999, category: 'drinks', image: 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg' },
];

// --- CAFE MENU (UNCHANGED from previous update) ---
export const cafeMenu: MenuItem[] = [
  // ... (Cafe Menu remains as previously defined)
  { id: 'c1', name: 'Aloo Tikki Burger', description: 'Classic spiced potato patty burger.', price: 99, category: 'veg', image: 'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg' },
  { id: 'c2', name: 'Paneer Burger', description: 'Grilled paneer patty burger.', price: 99, category: 'veg', image: 'https://images.pexels.com/photos/1556688/pexels-photo-1556688.jpeg' },
  { id: 'c4', name: 'American Chicken Burger', description: 'Crispy chicken with American cheese.', price: 120, category: 'non-veg', image: 'https://images.pexels.com/photos/3313098/pexels-photo-3313098.jpeg' },
  { id: 'c11', name: 'Chicken Popcorn (16 Pcs)', description: 'Crispy bite-sized chicken.', price: 150, category: 'starter', image: 'https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg' },
  { id: 'c14', name: 'Masala French Fries', description: 'Fries tossed in Indian masala.', price: 99, category: 'starter', image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg' },
  { id: 'c17', name: 'Mushroom White Sauce Pasta', description: 'Creamy white sauce with fresh mushrooms.', price: 150, category: 'veg', image: 'https://images.pexels.com/photos/2347311/pexels-photo-2347311.jpeg' },
  { id: 'c20', name: 'Chicken White Sauce Pasta', description: 'Creamy white sauce with tender chicken.', price: 169, category: 'non-veg', image: 'https://images.pexels.com/photos/2347311/pexels-photo-2347311.jpeg' },
  { id: 'c23', name: 'Margherita Pizza', description: 'Tomato sauce and Mozzarella cheese.', price: 149, category: 'veg', image: 'https://images.pexels.com/photos/3157551/pexels-photo-3157551.jpeg' },
  { id: 'c26', name: 'Calcutta Tandoori Special Pizza', description: 'Spicy chicken, Jalapeno, Onion, Black Olive.', price: 220, category: 'non-veg', image: 'https://images.pexels.com/photos/3157551/pexels-photo-3157551.jpeg' },
  { id: 'd1', name: 'Coffee', description: 'Classic hot coffee.', price: 50, category: 'drinks', image: 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg' },
  { id: 'd4', name: 'Cold Coffee', description: 'Chilled coffee with milk.', price: 100, category: 'drinks', image: 'https://images.pexels.com/photos/10398016/pexels-photo-10398016.jpeg' },
  { id: 'd7', name: 'Masala Cold Drink', description: 'Spicy, tangy aerated drink.', price: 60, category: 'drinks', image: 'https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg' },
];