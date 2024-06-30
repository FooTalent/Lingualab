# Consideraciones de mi forma de programar

## Respuestas Modelo

```json
{
    "isError": false,
    "message": "text",
    "data": {}
}
```

## Notas

* A mis "Schema - Modelos" estan creado pensando en los forms del Front, porque incluyen:
  * label = label del input
  * comments = notas o aclaraciones a usar
  * enum = son los select
  * match = son regex a usar para validaciones
  * disabled = son campos que se pueden mostrar pero desabilitados porque los configura el back
  * \+ el type (para que se aequivalene hay que agregarle las "")
  * \+ required y default
  