

## Plan: Add Whole & Half Jerk Chicken to Menu + Feature with Images

### Step 1: Copy uploaded images to project
- Copy `jerk.jpeg` → `src/assets/gallery/jerk-whole.jpeg`
- Copy `jerk2.jpeg` → `src/assets/gallery/jerk-grill.jpeg`

### Step 2: Add new menu section in `src/pages/Menu.tsx`
- Add a **"Jerk Chicken Cuts"** featured section near the top of the menu (after Lunch Special, before Roti Wraps)
- Two items:
  - **Half Jerk Chicken** - $17.50
  - **Whole Jerk Chicken** - $29.95
- Import both images and display them in this section with a visually distinct "featured" layout (images side by side or stacked above the items)
- Mark as orderable, add "New" or "Featured" badges

### Step 3: Add to Home page signature dishes carousel
- Import `jerk-whole.jpeg` and add a new dish entry to the `dishes` array:
  - Name: "Whole Jerk Chicken" or similar
  - Description highlighting the new offering

### Files to modify:
1. `src/assets/gallery/` - Add 2 new image files
2. `src/pages/Menu.tsx` - New featured section with images and items
3. `src/pages/Home.tsx` - Add to signature dishes carousel

