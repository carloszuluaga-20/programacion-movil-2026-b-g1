class Producto(
    val nombre: String?,
    val precio: Double
) {
    init {
        require(precio >= 0) { "El precio no puede ser negativo" }
    }

    fun mostrarInformacion() {
        val nombreSeguro = nombre ?: "Producto sin nombre"

        println("Producto: $nombreSeguro")
        println("Precio: $precio")
    }
}

fun main() {
    val producto1 = Producto("Cuaderno", 12000.0)
    val producto2 = Producto(null, 5000.0)

    producto1.mostrarInformacion()

    println()

    producto2.mostrarInformacion()
}