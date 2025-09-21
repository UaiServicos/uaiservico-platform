-- Create service categories
INSERT INTO service_categories (id, name, slug, description, icon, active) VALUES
('construcao', 'Construção e Reforma', 'construcao-reforma', 'Pedreiros, pintores, eletricistas e mais', '🔨', true),
('limpeza', 'Limpeza e Organização', 'limpeza-organizacao', 'Diaristas, faxineiras e organizadores', '🧹', true),
('manutencao', 'Manutenção Residencial', 'manutencao-residencial', 'Encanadores, técnicos e reparos', '🔧', true),
('jardinagem', 'Jardinagem e Paisagismo', 'jardinagem-paisagismo', 'Jardineiros e paisagistas', '🌱', true),
('beleza', 'Beleza e Estética', 'beleza-estetica', 'Cabeleireiros, manicures e esteticistas', '💄', true),
('culinaria', 'Culinária e Gastronomia', 'culinaria-gastronomia', 'Cozinheiros e confeiteiros', '👩‍🍳', true),
('cuidados', 'Cuidados Pessoais', 'cuidados-pessoais', 'Babás, cuidadores e acompanhantes', '👶', true),
('pets', 'Cuidados com Pets', 'cuidados-pets', 'Pet sitters, veterinários e adestradores', '🐕', true),
('tecnologia', 'Tecnologia e Informática', 'tecnologia-informatica', 'Técnicos em informática e instaladores', '💻', true),
('transporte', 'Transporte e Logística', 'transporte-logistica', 'Motoristas e entregadores', '🚗', true),
('educacao', 'Educação e Ensino', 'educacao-ensino', 'Professores particulares e instrutores', '📚', true),
('eventos', 'Eventos e Entretenimento', 'eventos-entretenimento', 'Fotógrafos, DJs e animadores', '🎉', true);
