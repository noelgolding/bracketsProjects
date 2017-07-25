var entity = new Entity();
entity.addComponent(new HealthComponent());
entity.addComponent(new PositionComponent());
entity.addComponent(new AppearanceComponent());
entity.addComponent(new PlayerControlledComponent());
entity.addComponent(new CollisionComponent());
entity.print();
