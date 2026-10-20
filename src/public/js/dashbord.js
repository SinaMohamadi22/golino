const ctx = document.getElementById('visitChart');

    new Chart(ctx, {
        type: 'line',

        data: {
            labels: [
                '۱ مهر',
                '۲ مهر',
                '۳ مهر',
                '۴ مهر',
                '۵ مهر',
                '۶ مهر',
                '۷ مهر'
            ],

            datasets: [{
                data: [
                    650,
                    920,
                    1150,
                    780,
                    1180,
                    1280,
                    1700
                ],

                borderColor: '#F21339',

                backgroundColor: 'rgba(242, 19, 57, 0.10)',

                borderWidth: 2,

                tension: 0.4,

                fill: true,

                pointRadius: 4,

                pointHoverRadius: 6,

                pointBackgroundColor: '#F21339',

                pointBorderColor: '#ffffff',

                pointBorderWidth: 2
            }]
        },

        options: {
            responsive: true,

            maintainAspectRatio: false,

            plugins: {
                legend: {
                    display: false
                }
            },

            scales: {

                y: {
                    beginAtZero: true,

                    max: 2000,

                    ticks: {
                        font: {
                            family: 'IranYekan',
                            size: 10
                        },

                        color: '#64748b',

                        stepSize: 500
                    },

                    grid: {
                        color: '#edf0f4'
                    },

                    border: {
                        display: false
                    }
                },

                x: {

                    ticks: {
                        font: {
                            family: 'IranYekan',
                            size: 10
                        },

                        color: '#64748b'
                    },

                    grid: {
                        display: false
                    },

                    border: {
                        display: false
                    }
                }

            }
        }
    });
