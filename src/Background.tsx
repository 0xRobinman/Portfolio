import React, { useEffect, useRef } from "react";
import './Background.css';

/**
 * Matrix style background
 * Light style
 * Pours each side of the container, which is not transparent
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
        this.char = char ?? this.getRandomChar();
        this.velocity = this.getRandomVelocity();
        this.previousChars = [];
        this.head = head;
        this.alpha = 1.0;
        this.colour = head ? 'rgba(220, 53, 69, 1)' : 'rgba(220, 53, 69, 1)';
        this.trailLength = head ? 10 + Math.random() * 15 : 0;
        this.alphaReduction = this.getAlpharReduction();
    }

    getAlpharReduction() {
        return 0.007 + Math.random() * 0.005
    }

    reduceAlpha(amount: number) {
        this.alpha -= amount
        this.alpha = Math.max(this.alpha, 0);
        this.colour = `rgba(220, 53, 69, ${this.alpha})`
    }

    getRandomVelocity() {
        return 0.03 + Math.random() * 0.05;
    }

    getRandomChar() {
        let randomRange = Math.floor(Math.random() * rangeTuples.length);
        let randomRangeTuple = rangeTuples[randomRange]

        let randomChar = Math.floor(Math.random() * (randomRangeTuple[1] - randomRangeTuple[0] + 1) + randomRangeTuple[0]);
        
        return String.fromCharCode(randomChar);
    }
    
    move() {
        this.y += this.velocity

        if (this.y >= this.bar) {
            this.bar += 1.2;

            this.previousChars.push(new Node({x: this.x, y: this.y, head: false, char: this.char}))

            this.char = this.getRandomChar();
        }

        this.previousChars.forEach((node) => {
            node.reduceAlpha(this.alphaReduction);
        })

        // Remove trail nodes that are fully transparent
        this.previousChars = this.previousChars.filter(node => node.alpha > 0);

        if (this.y >= 36) {
            this.previousChars = []
            this.trailLength = (this.head) ? 10 + Math.random() * 15 : 0
            this.alphaReduction = this.getAlpharReduction()
            this.y = 0;
            this.bar = 1.0
            this.velocity = this.getRandomVelocity()
        }
    }

};

const Background = () => {

    const backgroundColour = '#212529';
    const foregroundColour = 'rgba(220, 53, 69, 1)';
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const charCount = 20;

    const matrixNodesRef = useRef<Node[]>([]);
    const animationFrameId = useRef<number>(0);

    useEffect(() => {
        const nodes: Node[] = [];
        for (let x = 0; x < charCount; x += 2) {
            nodes.push(new Node({x: x, y: -Math.random() * 10}));
        }
        matrixNodesRef.current = nodes;
    }, [charCount]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const setCanvasSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            ctx.font = `${charCount}px 'DotGothic16', sans-serif`;
        }

        setCanvasSize();

        window.addEventListener('resize', setCanvasSize);

        return () => {
            window.removeEventListener('resize', setCanvasSize);
        };
    }, [charCount]);

    const drawMatrix = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
        ctx.fillStyle = backgroundColour;
        ctx.fillRect(0, 0, width, height);

        matrixNodesRef.current.forEach((node) => {
            node.move();
            ctx.fillStyle = node.colour;
            const xScaler = width / charCount;
            const yScaler = height / charCount;
            ctx.fillText(node.char, node.x * xScaler, node.y * yScaler)

            node.previousChars.forEach((trailNode) => {
                ctx.fillStyle = trailNode.colour;
                ctx.fillText(trailNode.char, trailNode.x * xScaler, trailNode.y * yScaler)
            })
        });
    }

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const render = () => {
            drawMatrix(ctx, canvas.width, canvas.height);
            animationFrameId.current = window.requestAnimationFrame(render);
        }

        render();

        return () => {
            window.cancelAnimationFrame(animationFrameId.current);
        }
    }, [backgroundColour, foregroundColour, charCount]);

    return (
        <canvas 
            ref={canvasRef} 
            style={{ position: 'fixed', top: 0, left: 0, zIndex: -2 }}
        />
    );
};

export default Background;
