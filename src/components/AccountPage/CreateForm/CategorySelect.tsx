import { useEffect, useState } from 'react';

interface Category {
  id: string;
  name: string;
}

interface CategorySelectProps {
  value: string;
  onChange: (id: string, name: string) => void; // changed
}

export default function CategorySelect({
  value,
  onChange,
}: CategorySelectProps) {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetch('/api/categories')
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <label>
      Category:
      <select
        name='category_id'
        value={value}
        onChange={(e) => {
          const id = e.target.value;
          const name = e.target.selectedOptions[0].text;
          onChange(id, name);
        }}
        required
      >
        <option value=''>Select a category</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>
    </label>
  );
}
