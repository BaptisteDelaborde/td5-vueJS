export default {
    install(app, options) {
        const maxLength = options.maxLength || 50
        app.mixin({
            methods: {
                // DD/MM/YYYY en YYYY-MM-DD
                dateToDB(datefr) {
                    const [day, month, year] = datefr.split('/')
                    return `${year}-${month}-${day}`
                },

                // YYYY-MM-DD en DD/MM/YYYY
                dbDateToFr(datedb) {
                    const [year, month, day] = datedb.split('-')
                    return `${day}/${month}/${year}`
                },

                // YYYY-MM-DD HH:mm:ss en DD/MM/YYYY HH:mm
                dbDateHourToFr(hourdb) {
                    const [date, time] = hourdb.split(' ')
                    const [year, month, day] = date.split('-')
                    return `${day}/${month}/${year} ${time.slice(0, 5)}`
                },

                // 1540.45 en 1540,45 €
                formatAmount(amount) {
                    return Number(amount).toLocaleString('fr-FR', {
                        style: 'currency',
                        currency: 'EUR',
                        minimumFractionDigits: 2,
                    })
                },

                // Coupe un texte long
                cutText(text, length = maxLength) {
                return text.length > length
                    ? text.slice(0, length) + '...'
                    : text
                },
            }
        }),

        app.directive('focus', {
            mounted(el) {
                el.focus()
            },
        })
    }

}