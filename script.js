document.addEventListener('DOMContentLoaded', function() {
    const cropForm = document.getElementById('cropForm');
    const resultSection = document.getElementById('resultSection');
    const outputSection = document.getElementById('outputSection');
    
    // Get all slider elements and their corresponding value displays
    const sliders = {
        nitrogen: {
            slider: document.getElementById('nitrogen'),
            value: document.getElementById('nitrogenValue')
        },
        phosphorus: {
            slider: document.getElementById('phosphorus'),
            value: document.getElementById('phosphorusValue')
        },
        potassium: {
            slider: document.getElementById('potassium'),
            value: document.getElementById('potassiumValue')
        },
        temperature: {
            slider: document.getElementById('temperature'),
            value: document.getElementById('temperatureValue')
        },
        humidity: {
            slider: document.getElementById('humidity'),
            value: document.getElementById('humidityValue')
        },
        ph: {
            slider: document.getElementById('ph'),
            value: document.getElementById('phValue')
        },
        rainfall: {
            slider: document.getElementById('rainfall'),
            value: document.getElementById('rainfallValue')
        }
    };
    
    // Update slider value displays in real-time and set CSS variable for gradient
    for (const [key, sliderObj] of Object.entries(sliders)) {
        sliderObj.slider.addEventListener('input', function() {
            const value = this.value;
            const min = this.min ? this.min : 0;
            const max = this.max ? this.max : 100;
            const percent = ((value - min) / (max - min)) * 100;
            
            sliderObj.value.textContent = value;
            this.style.setProperty('--slider-percent', `${percent}%`);
        });
        
        // Initialize the slider values and gradients
        const event = new Event('input');
        sliderObj.slider.dispatchEvent(event);
    }
    
    // Crop database with optimal parameters and image URLs
    const cropDatabase = {
        "rice": {
            name: "Rice",
            description: "Rice is a staple food for a large part of the world's population. It grows well in warm, humid climates with plenty of water.",
            image: "images/rice.jpg",
            optimalParams: {
                growingSeason: "Kharif (June - November)",
                waterNeeds: "High (150-300 cm)",
                soilPreference: "Clayey, loamy soil with good water retention",
                maturityTime: "3-6 months"
            }
        },
        "maize": {
            name: "Maize (Corn)",
            description: "Maize is a widely cultivated cereal grain. It's versatile and used for human consumption, animal feed, and industrial products.",
            image: "images/maize.jpg",
            optimalParams: {
                growingSeason: "Both Kharif and Rabi",
                waterNeeds: "Moderate (60-120 cm)",
                soilPreference: "Well-drained loamy soil",
                maturityTime: "3-4 months"
            }
        },
        "chickpea": {
            name: "Chickpea",
            description: "Chickpeas are a rich source of protein and are grown mainly in dry areas.",
            image: "images/chickpeas.jpg",
            optimalParams: {
                growingSeason: "Rabi (October - March)",
                waterNeeds: "Low (40-60 cm)",
                soilPreference: "Well-drained loamy soil",
                maturityTime: "4-5 months"
            }
        },
        "kidneybeans": {
            name: "Kidney Beans",
            description: "Kidney beans are a nutritious legume rich in protein and fiber.",
            image: "images/kidneybeans.jpeg",
            optimalParams: {
                growingSeason: "Kharif (June - September)",
                waterNeeds: "Moderate (50-100 cm)",
                soilPreference: "Loamy soil with good drainage",
                maturityTime: "3-4 months"
            }
        },
        "pigeonpeas": {
            name: "Pigeon Peas",
            description: "Pigeon peas are a drought-resistant legume commonly grown in semi-arid regions.",
            image: "images/pigeonpeas.jpg",
            optimalParams: {
                growingSeason: "Kharif (June - October)",
                waterNeeds: "Moderate (60-100 cm)",
                soilPreference: "Well-drained sandy loam",
                maturityTime: "5-6 months"
            }
        },
        "mothbeans": {
            name: "Moth Beans",
            description: "Moth beans are a drought-resistant legume grown mainly in arid and semi-arid regions.",
            image: "images/mothbeans.jpeg",
            optimalParams: {
                growingSeason: "Kharif (July - September)",
                waterNeeds: "Low (40-60 cm)",
                soilPreference: "Sandy loam",
                maturityTime: "2-3 months"
            }
        },
        "mungbean": {
            name: "Mung Bean",
            description: "Mung beans are a small, green legume rich in protein and commonly used in Asian cuisine.",
            image: "images/mungbeans.jpeg",
            optimalParams: {
                growingSeason: "Kharif (July - October)",
                waterNeeds: "Moderate (50-100 cm)",
                soilPreference: "Well-drained loamy soil",
                maturityTime: "2-3 months"
            }
        },
        "blackgram": {
            name: "Black Gram",
            description: "Black gram is a high-protein pulse crop used in various cuisines.",
            image: "images/blackgram.jpg",
            optimalParams: {
                growingSeason: "Kharif (July - October)",
                waterNeeds: "Moderate (50-100 cm)",
                soilPreference: "Loamy soil with good drainage",
                maturityTime: "3-4 months"
            }
        },
        "lentil": {
            name: "Lentil",
            description: "Lentils are a protein-rich legume grown in cool-season conditions.",
            image: "images/lentils.jpg",
            optimalParams: {
                growingSeason: "Rabi (November - March)",
                waterNeeds: "Low (30-50 cm)",
                soilPreference: "Well-drained loamy soil",
                maturityTime: "4-5 months"
            }
        },
        "pomegranate": {
            name: "Pomegranate",
            description: "Pomegranates are a fruit crop known for their rich antioxidants and nutritional value.",
            image: "images/pomogranate.jpeg",
            optimalParams: {
                growingSeason: "Perennial (March - June planting)",
                waterNeeds: "Moderate (50-100 cm)",
                soilPreference: "Loamy soil with good drainage",
                maturityTime: "5-7 months"
            }
        },
        "banana": {
            name: "Banana",
            description: "Bananas are a tropical fruit that grows year-round in warm climates.",
            image: "images/banana.jpg",
            optimalParams: {
                growingSeason: "Perennial",
                waterNeeds: "High (100-250 cm)",
                soilPreference: "Well-drained loamy soil",
                maturityTime: "9-12 months"
            }
        },
        "mango": {
            name: "Mango",
            description: "Mango is a tropical fruit known for its sweet, juicy flavor and rich nutritional value.",
            image: "images/mango.jpg",
            optimalParams: {
                growingSeason: "Summer (March - June)",
                waterNeeds: "Moderate (75-200 cm)",
                soilPreference: "Well-drained loamy soil",
                maturityTime: "4-6 months"
            }
        },
        "grapes": {
            name: "Grapes",
            description: "Grapes are a widely cultivated fruit used for fresh consumption and winemaking.",
            image: "images/grapes.jpg",
            optimalParams: {
                growingSeason: "Perennial (March - May)",
                waterNeeds: "Moderate (50-100 cm)",
                soilPreference: "Well-drained sandy loam",
                maturityTime: "2-3 years"
            }
        },
        "watermelon": {
            name: "Watermelon",
            description: "Watermelon is a refreshing fruit rich in water content and grown in warm climates.",
            image: "images/watermelon.jpeg",
            optimalParams: {
                growingSeason: "Summer (March - June)",
                waterNeeds: "Moderate (50-75 cm)",
                soilPreference: "Sandy loam with good drainage",
                maturityTime: "3-4 months"
            }
        },
        "muskmelon": {
            name: "Muskmelon",
            description: "Muskmelon is a sweet, aromatic fruit that thrives in warm climates.",
            image: "images/muskmelon.jpg",
            optimalParams: {
                growingSeason: "Summer (March - June)",
                waterNeeds: "Moderate (50-75 cm)",
                soilPreference: "Well-drained sandy loam",
                maturityTime: "3-4 months"
            }
        },
        "apple": {
            name: "Apple",
            description: "Apples are a popular fruit grown in temperate regions, known for their crisp texture and sweet taste.",
            image: "images/apple.jpg",
            optimalParams: {
                growingSeason: "Temperate (April - October)",
                waterNeeds: "Moderate (50-100 cm)",
                soilPreference: "Well-drained loamy soil",
                maturityTime: "6-8 months"
            }
        },
        "orange": {
            name: "Orange",
            description: "Oranges are citrus fruits valued for their vitamin C content and refreshing taste.",
            image: "images/orange.jpeg",
            optimalParams: {
                growingSeason: "Winter (October - March)",
                waterNeeds: "Moderate (60-120 cm)",
                soilPreference: "Sandy loam with good drainage",
                maturityTime: "8-10 months"
            }
        },
        "papaya": {
            name: "Papaya",
            description: "Papayas are tropical fruits known for their soft texture and sweet taste.",
            image: "images/papaya.jpeg",
            optimalParams: {
                growingSeason: "Tropical (Year-round)",
                waterNeeds: "High (100-250 cm)",
                soilPreference: "Well-drained loamy soil",
                maturityTime: "9-12 months"
            }
        },
        "coconut": {
            name: "Coconut",
            description: "Coconuts are tropical fruits known for their versatility and high water content.",
            image: "images/coconut.jpg",
            optimalParams: {
                growingSeason: "Tropical (Year-round)",
                waterNeeds: "High (150-300 cm)",
                soilPreference: "Sandy loam with good drainage",
                maturityTime: "12-15 months"
            }
        },
        "cotton": {
            name: "Cotton",
            description: "Cotton is a fiber crop used extensively in the textile industry.",
            image: "images/cotton.jpg",
            optimalParams: {
                growingSeason: "Kharif (April - September)",
                waterNeeds: "Moderate (50-120 cm)",
                soilPreference: "Well-drained black soil",
                maturityTime: "5-6 months"
            }
        },
        "jute": {
            name: "Jute",
            description: "Jute is a fiber crop used for making ropes, sacks, and other products.",
            image: "images/jute.jpg",
            optimalParams: {
                growingSeason: "Kharif (March - July)",
                waterNeeds: "High (150-300 cm)",
                soilPreference: "Alluvial soil",
                maturityTime: "4-5 months"
            }
        },
        "coffee": {
            name: "Coffee",
            description: "Coffee is a globally consumed beverage crop known for its stimulating effects.",
            image: "images/coffee.jpg",
            optimalParams: {
                growingSeason: "Tropical (Year-round)",
                waterNeeds: "Moderate (100-200 cm)",
                soilPreference: "Well-drained loamy soil",
                maturityTime: "3-5 years"
            }
        }
    };    
  
    // Form submission handler

    cropForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Gather input values
        const formData = {
            nitrogen: parseFloat(sliders.nitrogen.slider.value),
            phosphorus: parseFloat(sliders.phosphorus.slider.value),
            potassium: parseFloat(sliders.potassium.slider.value),
            temperature: parseFloat(sliders.temperature.slider.value),
            humidity: parseFloat(sliders.humidity.slider.value),
            ph: parseFloat(sliders.ph.slider.value),
            rainfall: parseFloat(sliders.rainfall.slider.value)
        };

        try {
            // Send data to Flask backend
            const response = await fetch('http://127.0.0.1:5000/predict', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const result = await response.json();
            
            if (result.crop) {
                const predictedCrop = result.crop.toLowerCase();
                const matchedCrop = Object.keys(cropDatabase).find(key => 
                    key.toLowerCase() === predictedCrop
                );

                if (matchedCrop) {
                    const cropInfo = cropDatabase[matchedCrop];
                    
                    // Build the result HTML with proper image handling
                    let resultHTML = `
                        <h2>Recommended Crop: ${cropInfo.name}</h2>
                        <div class="result-card">
                    `;
                    
                    // Add image container with proper styling
                    if (cropInfo.image) {
                        resultHTML += `
                            <div class="crop-image-container" style="
                                width: 100%;
                                max-width: 300px;
                                height: 200px;
                                overflow: hidden;
                                margin: 0 auto 20px;
                                border-radius: 8px;
                                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                            ">
                                <img src="${cropInfo.image}" alt="${cropInfo.name}" style="
                                    width: 100%;
                                    height: 100%;
                                    object-fit: cover;
                                ">
                            </div>
                        `;
                    }
                    
                    // Add crop information
                    resultHTML += `
                            <div class="crop-info" style="
                                padding: 15px;
                                background: #f8f9fa;
                                border-radius: 8px;
                            ">
                                <p style="margin-bottom: 15px;">${cropInfo.description}</p>
                                <div class="parameters">
                                    <h4 style="margin-bottom: 10px;">Optimal Growing Conditions:</h4>
                                    <ul style="
                                        list-style-type: none;
                                        padding: 0;
                                        margin: 0;
                                    ">
                    `;
                    
                    // Add optimal parameters
                    for (const [param, value] of Object.entries(cropInfo.optimalParams)) {
                        resultHTML += `
                            <li style="margin-bottom: 8px;">
                                <strong>${param.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:</strong> 
                                <span>${value}</span>
                            </li>
                        `;
                    }
                    
                    // Close HTML
                    resultHTML += `
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <button class="btn try-again-btn" id="tryAgainBtn" style="
                            margin-top: 20px;
                            padding: 10px 20px;
                            background: #28a745;
                            color: white;
                            border: none;
                            border-radius: 4px;
                            cursor: pointer;
                        ">Try Again</button>
                    `;
                    
                    resultSection.innerHTML = resultHTML;
                    
                    // Add event listener for try again button
                    document.getElementById('tryAgainBtn').addEventListener('click', function() {
                        resultSection.innerHTML = `
                            <h2>Recommended Crop Will Appear Here</h2>
                            <div class="placeholder">
                                <i class="fas fa-seedling"></i>
                                <p>Adjust the parameters and click "Recommend Crop" to see results</p>
                            </div>
                        `;
                    });
                } else {
                    resultSection.innerHTML = `
                        <h2>New Crop Detected: ${result.crop}</h2>
                        <p>We've received a recommendation for ${result.crop}, but don't have detailed information about this crop yet.</p>
                    `;
                }
            } else if (result.error) {
                resultSection.innerHTML = `
                    <h2>Error</h2>
                    <p>${result.error}</p>
                    <p>${result.message || ''}</p>
                `;
            }
        } catch (error) {
            console.error('Error:', error);
            resultSection.innerHTML = `
                <h2>Connection Error</h2>
                <p>Failed to connect to the recommendation service.</p>
            `;
        }
    });
    
});