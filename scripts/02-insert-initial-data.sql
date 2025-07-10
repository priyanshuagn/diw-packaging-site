-- Insert default categories
INSERT INTO categories (name, slug, description) VALUES
('Luxury Boxes', 'luxury-boxes', 'Premium packaging boxes with luxury finishes'),
('Trading Cards', 'trading-cards', 'High-quality trading card printing and design'),
('Specialty Finishes', 'specialty-finishes', 'Custom finishes including foil, embossing, and textures'),
('Custom Packaging', 'custom-packaging', 'Bespoke packaging solutions for unique requirements');

-- Insert default tags
INSERT INTO tags (name, slug) VALUES
('Sustainability', 'sustainability'),
('Innovation', 'innovation'),
('Design', 'design'),
('Trading Cards', 'trading-cards'),
('Luxury', 'luxury'),
('Psychology', 'psychology'),
('Packaging', 'packaging'),
('Foil Stamping', 'foil-stamping'),
('Embossing', 'embossing'),
('UV Coating', 'uv-coating');

-- Insert default translations
INSERT INTO translations (translation_key, language, value) VALUES
-- Navigation
('portfolio', 'en', 'Portfolio'),
('portfolio', 'sk', 'Portfólio'),
('portfolio', 'cs', 'Portfolio'),
('portfolio', 'de', 'Portfolio'),
('portfolio', 'es', 'Portafolio'),
('portfolio', 'it', 'Portfolio'),

('about', 'en', 'About'),
('about', 'sk', 'O nás'),
('about', 'cs', 'O nás'),
('about', 'de', 'Über uns'),
('about', 'es', 'Acerca de'),
('about', 'it', 'Chi siamo'),

('certifications', 'en', 'Certifications'),
('certifications', 'sk', 'Certifikácie'),
('certifications', 'cs', 'Certifikace'),
('certifications', 'de', 'Zertifizierungen'),
('certifications', 'es', 'Certificaciones'),
('certifications', 'it', 'Certificazioni'),

('references', 'en', 'References'),
('references', 'sk', 'Referencie'),
('references', 'cs', 'Reference'),
('references', 'de', 'Referenzen'),
('references', 'es', 'Referencias'),
('references', 'it', 'Referenze'),

('blog', 'en', 'Blog'),
('blog', 'sk', 'Blog'),
('blog', 'cs', 'Blog'),
('blog', 'de', 'Blog'),
('blog', 'es', 'Blog'),
('blog', 'it', 'Blog'),

('contact', 'en', 'Contact'),
('contact', 'sk', 'Kontakt'),
('contact', 'cs', 'Kontakt'),
('contact', 'de', 'Kontakt'),
('contact', 'es', 'Contacto'),
('contact', 'it', 'Contatto'),

-- Common phrases
('request_quote', 'en', 'Request Quote'),
('request_quote', 'sk', 'Požiadať o cenovú ponuku'),
('request_quote', 'cs', 'Požádat o nabídku'),
('request_quote', 'de', 'Angebot anfordern'),
('request_quote', 'es', 'Solicitar cotización'),
('request_quote', 'it', 'Richiedi preventivo'),

('watch_video', 'en', 'Watch Video'),
('watch_video', 'sk', 'Pozrieť video'),
('watch_video', 'cs', 'Sledovat video'),
('watch_video', 'de', 'Video ansehen'),
('watch_video', 'es', 'Ver video'),
('watch_video', 'it', 'Guarda video'),

-- Site settings
('get_in_touch', 'en', 'Get In Touch'),
('get_in_touch', 'sk', 'Kontaktujte nás'),
('get_in_touch', 'cs', 'Kontaktujte nás'),
('get_in_touch', 'de', 'Kontakt aufnehmen'),
('get_in_touch', 'es', 'Ponte en contacto'),
('get_in_touch', 'it', 'Mettiti in contatto');

-- Insert site settings
INSERT INTO site_settings (key, value, description) VALUES
('company_info', '{
  "name": "DIW – Do It Wow Packaging",
  "address": "Hlavná 123, 811 01 Bratislava, Slovakia",
  "phone": "+421 123 456 789",
  "email": "info@diwpackaging.com",
  "website": "https://diwpackaging.com"
}', 'Company contact information'),

('social_media', '{
  "facebook": "https://facebook.com/diwpackaging",
  "instagram": "https://instagram.com/diwpackaging",
  "linkedin": "https://linkedin.com/company/diwpackaging"
}', 'Social media links'),

('business_hours', '{
  "monday": "09:00-17:00",
  "tuesday": "09:00-17:00",
  "wednesday": "09:00-17:00",
  "thursday": "09:00-17:00",
  "friday": "09:00-17:00",
  "saturday": "closed",
  "sunday": "closed",
  "timezone": "CET"
}', 'Business operating hours'),

('seo_defaults', '{
  "title": "DIW – Do It Wow Packaging | Luxury Packaging & Trading Cards",
  "description": "Premium luxury packaging and trading card printing services. Custom boxes, specialty finishes, and high-quality printing solutions.",
  "keywords": "luxury packaging, trading cards, custom boxes, premium printing, packaging design"
}', 'Default SEO settings');
