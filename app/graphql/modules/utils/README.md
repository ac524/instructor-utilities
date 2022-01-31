# Intended Usages and Examples

## createControllerModule

```js
createControllerModule({
    ...commonCreateModuleParams,
    /** @see /app/controllers/definitions */
    id: "controllerkeyname",
    // List of abilities to translate into mutations and resolvers
    abilities: [
        // Array list of ability names (Ex: "view", "create", "update", "delete")
    ]
    // (optional) Configuration for validating room member permissions against given `abilities`
    memberPermission: {
        /** @see /app/graphql/middleware/setRoomContext */
        context: "roomContextLoaderMethodName",
        /** @see /app/config/permissions/sets */
        set: "permissionSetName"
    },
    // (optional)
    middlewares: {
        ...customMiddlewares
    }
    // (optional)
    resolvers: {
        ...customResolvers
    }
})
```