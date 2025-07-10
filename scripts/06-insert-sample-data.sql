-- Insert sample portfolio items for testing
INSERT INTO portfolio_items (title, slug, description, client_name, project_date, category_id, status, language, created_by) 
SELECT 
  'Luxury Watch Box',
  'luxury-watch-box',
  'Premium packaging solution for high-end timepieces featuring velvet interior and gold foil stamping.',
  'Luxury Timepieces Co.',
  '2024-01-15',
  c.id,
  'published',
  'en',
  '00000000-0000-0000-0000-000000000000'  -- Replace with actual user ID
FROM categories c WHERE c.slug = 'luxury-boxes'
LIMIT 1;

INSERT INTO portfolio_items (title, slug, description, client_name, project_date, category_id, status, language, created_by) 
SELECT 
  'Premium Trading Cards',
  'premium-trading-cards',
  'High-quality trading card printing with holographic foil and specialty finishes.',
  'Gaming Studio X',
  '2024-01-10',
  c.id,
  'published',
  'en',
  '00000000-0000-0000-0000-000000000000'  -- Replace with actual user ID
FROM categories c WHERE c.slug = 'trading-cards'
LIMIT 1;

INSERT INTO portfolio_items (title, slug, description, client_name, project_date, category_id, status, language, created_by) 
SELECT 
  'Custom Jewelry Box',
  'custom-jewelry-box',
  'Bespoke jewelry packaging with embossed logo and satin lining.',
  'Diamond Boutique',
  '2024-01-05',
  c.id,
  'published',
  'en',
  '00000000-0000-0000-0000-000000000000'  -- Replace with actual user ID
FROM categories c WHERE c.slug = 'luxury-boxes'
LIMIT 1;

-- Insert portfolio features for the items
INSERT INTO portfolio_features (portfolio_item_id, feature_name)
SELECT p.id, 'Gold Foil Stamping'
FROM portfolio_items p WHERE p.slug = 'luxury-watch-box';

INSERT INTO portfolio_features (portfolio_item_id, feature_name)
SELECT p.id, 'Velvet Interior'
FROM portfolio_items p WHERE p.slug = 'luxury-watch-box';

INSERT INTO portfolio_features (portfolio_item_id, feature_name)
SELECT p.id, 'Magnetic Closure'
FROM portfolio_items p WHERE p.slug = 'luxury-watch-box';

INSERT INTO portfolio_features (portfolio_item_id, feature_name)
SELECT p.id, 'Holographic Foil'
FROM portfolio_items p WHERE p.slug = 'premium-trading-cards';

INSERT INTO portfolio_features (portfolio_item_id, feature_name)
SELECT p.id, 'UV Coating'
FROM portfolio_items p WHERE p.slug = 'premium-trading-cards';

INSERT INTO portfolio_features (portfolio_item_id, feature_name)
SELECT p.id, 'Embossed Logo'
FROM portfolio_items p WHERE p.slug = 'custom-jewelry-box';

INSERT INTO portfolio_features (portfolio_item_id, feature_name)
SELECT p.id, 'Satin Lining'
FROM portfolio_items p WHERE p.slug = 'custom-jewelry-box';

-- Insert sample blog posts
INSERT INTO blog_posts (title, slug, excerpt, content, status, language, author_id, published_at, seo_title, seo_description)
VALUES 
(
  'The Future of Sustainable Packaging',
  'future-sustainable-packaging',
  'Explore how eco-friendly materials and processes are shaping the luxury packaging industry.',
  '<h2>Introduction</h2><p>Sustainability is becoming increasingly important in the packaging industry. As consumers become more environmentally conscious, brands are seeking packaging solutions that align with their values.</p><h2>Key Trends</h2><ul><li>Biodegradable materials</li><li>Recyclable designs</li><li>Reduced carbon footprint</li></ul><h2>Conclusion</h2><p>The future of packaging lies in sustainable innovation that doesn''t compromise on quality or aesthetics.</p>',
  'published',
  'en',
  '00000000-0000-0000-0000-000000000000',  -- Replace with actual user ID
  NOW(),
  'Sustainable Packaging Trends 2024 | DIW Packaging',
  'Discover the latest trends in sustainable luxury packaging and how eco-friendly solutions are transforming the industry.'
),
(
  'Trading Card Design Trends 2024',
  'trading-card-design-trends-2024',
  'Discover the latest trends in trading card design, from holographic effects to interactive elements.',
  '<h2>Current Trends</h2><p>The trading card industry is experiencing a renaissance with new printing technologies and design innovations.</p><h2>Popular Effects</h2><ul><li>Holographic foils</li><li>Textured surfaces</li><li>Interactive QR codes</li></ul><h2>Market Impact</h2><p>These innovations are driving increased collector interest and market value.</p>',
  'published',
  'en',
  '00000000-0000-0000-0000-000000000000',  -- Replace with actual user ID
  NOW(),
  'Trading Card Design Trends 2024 | DIW Packaging',
  'Explore the latest trading card design trends and printing innovations that are captivating collectors worldwide.'
);
