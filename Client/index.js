const x = document.querySelector('#x')
const y = document.querySelector('#y')
const btn = document.querySelector('.btn')
const board = document.querySelector('#board')
const form = document.querySelector("#form");

let widthMobileScreen = screen.width;
const check = {
    x: false,
    y: false
}

const createPoint = (element) => {
    const point = document.createElement("span");
    point.classList.add('point');
    point.style.backgroundColor = element.color;
    point.style.position = 'absolute';
    point.style.left = `${element.y}%`;
    point.style.bottom = `${element.x}%`;
    board.appendChild(point);
}

const checkDisable = () => {
    btn.disabled = !(check.x && check.y);
    btn.classList.toggle('btn-active', check.x && check.y);
    btn.style.cursor = btn.disabled ? 'not-allowed' : 'pointer';
}

x.addEventListener('keyup', (e) => {
    const value = e.target.value

    if (!value) {
        check.x = false
        return
    }

    if (value < 0 || value > 100) {
        x.parentNode.nextElementSibling.textContent = "Giá trị của x phải nằm trong khoảng từ 0 đến 100";
        if (widthMobileScreen < 768) {
            x.parentNode.nextElementSibling.style.display = 'block'
        }
        check.x = false
    } else {
        x.parentNode.nextElementSibling.textContent = ""
        if (widthMobileScreen < 768) {
            x.parentNode.nextElementSibling.style.display = 'none'
        }
        check.x = true
    }

    checkDisable()

})

y.addEventListener('keyup', (e) => {
    const value = e.target.value.trim()
    if (!value) {
        check.y = false
        return
    }

    if (value < 0 || value > 100) {
        y.parentNode.nextElementSibling.textContent = "Giá trị của y phải nằm trong khoảng từ 0 đến 100";
        check.y = false
        if (widthMobileScreen < 768) {
            x.parentNode.nextElementSibling.style.display = 'block'
        }
    } else {
        y.parentNode.nextElementSibling.textContent = ""
        check.y = true
        if (widthMobileScreen < 768) {
            x.parentNode.nextElementSibling.style.display = 'none'
        }
    }
    checkDisable()
})

const addNewPoint = async (x, y, color) => {
    const response = await fetch('http://localhost:4000/points', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            x, y, color
        })

    })
    const data = await response.json()
}

const getAllPoint = async () => {
    try {
        const response = await fetch("http://localhost:4000/points");
        const data = await response.json();
        const points = data.data
        points.forEach(element => createPoint(element))
    } catch (error) {
        console.log(error)
    }
}


const ramdomColor = () => {
    return Math.floor(Math.random() * 256);
}

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const xValue = x.value
    const yValue = y.value

    // const color = `rgba(${ramdomColor()} ,${ramdomColor()} , ${ramdomColor()} ,  ${Math.random()} )`
    const color = `rgba(${ramdomColor()} ,${ramdomColor()} , ${ramdomColor()}  )`
    await addNewPoint(xValue, yValue, color)
    await getAllPoint()

});

async function start() {
    checkDisable()
    await getAllPoint()
}

start();

