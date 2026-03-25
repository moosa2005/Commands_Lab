import { allGenerators } from './src/data/generators';
import { categories } from './src/data/categories';

const categoryIds = new Set(categories.map(c => c.id));
let issues = 0;

allGenerators.forEach(gen => {
  if (!gen.categoryId) {
    console.error(`Generator ${gen.id} is missing categoryId`);
    issues++;
  } else if (!categoryIds.has(gen.categoryId)) {
    console.error(`Generator ${gen.id} has invalid categoryId: ${gen.categoryId}`);
    issues++;
  }
});

if (issues === 0) {
  console.log('All generators have valid categoryId');
} else {
  console.log(`Found ${issues} issues`);
}
