# Patterns recommendations and operations

As stated in [Folder structure](be-architecture-folder-structure.html), the boilerplate follows an architecture inspired by DDD and Clean Architecture. It implies in some patterns and methodologies having to be followed to ensure separation of concerns and make the codebase more maintainable, I'll list of them here and suggest some links in the end with further info of patterns and practices that work well with this architecture.

## Separation of concerns

Separation of concerns is ensured in this codebase in two ways:

1. Separating the source code in [layer](be-architecture-folder-structure.html), each layer with a different responsibility that should be followed;
2. Each layer is also separated by actual _concerns_. When we talk about concerns in software development it's not about functionality, like `controllers` or `models`, but about _concepts_ or _contexts_, like `users`, `logging`, `persistence` and so on.

All the patterns below have direct relation with separation of concerns.

## Repository pattern

Inside the use cases you should also not touch the database directly, it's not the responsibility of the application layer to know how to work with data persistence. So we implement [repositories](https://martinfowler.com/eaaCatalog/repository.html) that handle the persistence internally and inject them on the operations instances.

**Attention for this point**: the repositories and their **implementations** (that effectively talk to the database) belongs to the `infra` layer, but since we don't have interfaces in JavaScript we just implement them on the `infra` layer and inject it with the name of the imaginary interface.

Separating the persistence from the `app` layer like this make it easier to test the `app` layer with different simulated responses from the database, including errors.

## Further info

You can know more about the subjects that we talked about here in the following links:

- [Architecture the Lost Years](https://www.youtube.com/watch?v=WpkDN78P884)
- [Domain-driven design](https://domainlanguage.com/ddd/)
- [FourLayerArchitecture](http://wiki.c2.com/?FourLayerArchitecture)
- [Clean architecture](https://8thlight.com/blog/uncle-bob/2012/08/13/the-clean-architecture.html)
