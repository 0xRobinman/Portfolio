import React, { useEffect, useRef, useState } from "react";
import './Background.css';

/**
 * Matrix style background
 * Light style
 * Pourds each side of the container, which is not transparent
 * It is a very light grey
 */
const hiraganaStart = 0x3040, hiraganaEnd = 0x309F;
const katakanaStart = 0x30A0, katakanaEnd = 0x30FF;
const kanjiStart = 0x4E00, kanjiEnd = 0x9FFF;
const asciiStart = 0x0030, asciiEnd = 0x0039;

const rangeTuples = [ 
    [hiraganaStart, hiraganaEnd],
    [kanjiStart, kanjiEnd],
    [katakanaStart, katakanaEnd],
    [asciiStart, asciiEnd]
]

interface NodeProps {
    x: number;
    y: number;
    head?: boolean;
    char?: string | null;
}
class Node {

        x: number;
        y: number;
        bar: number;
        char: string;
        velocity: number;
        previousChars: Node[];
        head: boolean;
        alpha: number;
        colour: string;
        trailLength: number;
        alphaReduction: number;

        constructor({ x, y, head = true, char = null }: NodeProps) {
            this.x = x;
            this.y = y;
            this.bar = 1;
            this.char = char ?? this.get_random_char();
            this.velocity = this.get_random_velocity();
            this.previousChars = [];
            this.head = head;
            this.alpha = 1.0;
            this.colour = head ? 'rgba(220, 53, 69, 1)' : 'rgba(220, 53, 69, 1)';
            this.trailLength = head ? 10 + Math.random() * 15 : 0;
            this.alphaReduction = this.get_alphaReduction();
        }

    get_alphaReduction() {
        return 0.007 + Math.random() * 0.005
    }

    reduce_alpha(amount :number) {
        this.alpha -= amount
        this.colour = 'rgba(220, 53, 69, ' + this.alpha + ')'
    }

    get_random_velocity()
    {
        return 0.03 + Math.random() * 0.05;
    }

    get_random_char()
    {
        let random_range = Math.floor(Math.random() * 4);
        random_range = rangeTuples[random_range]

        let random_char = Math.floor(Math.random() * (random_range[1] - random_range[0] + 1) + random_range[0]);
        
        return String.fromCharCode(random_char);
    }
    
    move()
    {

        this.y += this.velocity
        
        if (this.y >= this.bar) {
            this.bar+=1.2;

            this.previousChars.push(new Node({x: this.x, y: this.y, head: false, char: this.char}))

            this.char = this.get_random_char();
        }
        this.previousChars.forEach((node) => {
            node.reduce_alpha(this.alphaReduction);
        })

        if (this.y >= 36)
        {
            this.previousChars = []
            this.trailLength = (this.head) ? 10 + Math.random() * 15 : 0
            this.alphaReduction = this.get_alphaReduction()
            this.y = 0;
            this.bar = 1.0
            this.velocity = this.get_random_velocity()
        }
    }

};
const Background = () => {
    

    const backgroundColour = '#212529';
    const foregroundColour = 'rgba(220, 53, 69, 1)';
    const canvasReference = useRef(null);
    let matrix_char_count = 30
    
    const [canvas_dimensions, setDimensions] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });

    if (window.innerWidth <= 600)
        matrix_char_count = 15;
    else
        matrix_char_count = 30;

    let matrix_nodes = (function() {
        
        let arr = [];
    
        for (let x = 0; x < matrix_char_count; x+=2) {
            arr.push(new Node({x: x, y: -Math.random() * 10}));
        }
    
        return arr;
    })();

    let x_scaler = canvas_dimensions.width / matrix_char_count;
    let y_scaler = canvas_dimensions.height / matrix_char_count;


    useEffect(() => {
        const canvas = canvasReference.current;
        const ctx = canvas.getContext('2d');

        const fix_canvas = () => {

            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight
            });
            
            if (window.innerWidth <= 600)
                matrix_char_count = 15;
            else
                matrix_char_count = 30;

            x_scaler = canvas_dimensions.width / matrix_char_count;
            y_scaler = canvas_dimensions.height / matrix_char_count;

            draw_matrix(ctx);
        }  

        document.addEventListener('DOMContentLoaded', fix_canvas);
        window.addEventListener('load', fix_canvas);
        window.addEventListener('resize', fix_canvas);

        return () => {
            window.removeEventListener('resize', fix_canvas);
            window.removeEventListener('load', fix_canvas);
            document.removeEventListener('DOMContentLoaded', fix_canvas);
        };
        
    }, []);


    useEffect(() => {
        const canvas = canvasReference.current;
        const ctx = canvas.getContext('2d');

        canvas_dimensions.width = canvas.width;
        canvas_dimensions.height = canvas.height;
        
        draw_matrix(ctx);
    
    }, [canvas_dimensions]);


    const draw_matrix = (ctx, frames=0) => {

        ctx.clearRect(0, 0, canvas_dimensions.width, canvas_dimensions.height);

        ctx.fillStyle = backgroundColour;

        ctx.fillRect(0,0, canvas_dimensions.width, canvas_dimensions.height);

        ctx.fillStyle = foregroundColour;
    
        matrix_nodes.forEach((node) => {
            node.move();
            ctx.fillStyle = node.colour
            ctx.fillText(node.char, node.x * x_scaler, node.y * y_scaler)

            node.previousChars.forEach((trail_node) => {
                
                ctx.fillStyle = trail_node.colour
                

                ctx.fillText(trail_node.char, trail_node.x * x_scaler, trail_node.y * y_scaler)

            })
        });

    }

    useEffect(() => {

        let frames = 0;
        let frame_id = 0;
        const canvas = canvasReference.current;
        
        const ctx = canvas.getContext('2d');
        
        ctx.font = matrix_char_count + "px 'DotGothic16', sans-serif";

        const render_matrix = () => {

            draw_matrix(ctx);
            setTimeout(() => {
                frame_id = window.requestAnimationFrame(render_matrix);

            }, 0.0001);
        }
        
        render_matrix();

    }); 

    return (
        <canvas ref={canvasReference} 
            width={canvas_dimensions.width} 
            height={canvas_dimensions.height} 
            style={{position: 'fixed',  zIndex: -2,}}
            />
    );

};

export default Background;