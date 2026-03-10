import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useStore } from './store/useStore';

// Layouts
import MainLayout from './layout/MainLayout';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

// Tools
import ImageGenerator from './pages/tools/ImageGenerator';
import VideoGenerator from './pages/tools/VideoGenerator';
import Chatbot from './pages/tools/Chatbot';
import BgRemover from './pages/tools/BgRemover';
import TextToSpeech from './pages/tools/TextToSpeech';
import SpeechToText from './pages/tools/SpeechToText';
import YoutubeTranscriber from './pages/tools/YoutubeTranscriber';
import CurrencyConverter from './pages/tools/CurrencyConverter';
import ImageCompressor from './pages/tools/ImageCompressor';
import ImageResizer from './pages/tools/ImageResizer';
import ImageCropper from './pages/tools/ImageCropper';
import FormatConverter from './pages/tools/FormatConverter';
import ImageUpscaler from './pages/tools/ImageUpscaler';
import VideoToGif from './pages/tools/VideoToGif';
import GifToVideo from './pages/tools/GifToVideo';
import ScreenRecorder from './pages/tools/ScreenRecorder';
import WebcamRecorder from './pages/tools/WebcamRecorder';
import PasswordGenerator from './pages/tools/PasswordGenerator';
import PasswordStrength from './pages/tools/PasswordStrength';
import UnitConverter from './pages/tools/UnitConverter';
import AgeCalculator from './pages/tools/AgeCalculator';
import WordCounter from './pages/tools/WordCounter';
import LoremGenerator from './pages/tools/LoremGenerator';
import WorldClock from './pages/tools/WorldClock';
import BmiCalculator from './pages/tools/BmiCalculator';
import JsonFormatter from './pages/tools/JsonFormatter';
import JsonToCsv from './pages/tools/JsonToCsv';
import CsvToJson from './pages/tools/CsvToJson';
import HashGenerator from './pages/tools/HashGenerator';
import Base64Encoder from './pages/tools/Base64Encoder';
import QrGenerator from './pages/tools/QrGenerator';
// Document Workshop Tools
import PdfMerger from './pages/tools/PdfMerger';
import PdfSplitter from './pages/tools/PdfSplitter';
import PdfCompressor from './pages/tools/PdfCompressor';
import ImageToPdf from './pages/tools/ImageToPdf';
import PdfToImages from './pages/tools/PdfToImages';
import PdfToWord from './pages/tools/PdfToWord';
import WordToPdf from './pages/tools/WordToPdf';
import CsvVisualizer from './pages/tools/CsvVisualizer';
import QrScanner from './pages/tools/QrScanner';
import ColorExtractor from './pages/tools/ColorExtractor';
import DataComparator from './pages/tools/DataComparator';
import WebScraper from './pages/tools/WebScraper';
import JwtDebugger from './pages/tools/JwtDebugger';
import RegexTester from './pages/tools/RegexTester';
import HtmlFormatter from './pages/tools/HtmlFormatter';
import CssMinifier from './pages/tools/CssMinifier';
import JsMinifier from './pages/tools/JsMinifier';
import ApiTester from './pages/tools/ApiTester';
import SqlFormatter from './pages/tools/SqlFormatter';
import GenericTool from './pages/tools/GenericTool';

// Protected Route Wrapper
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { user } = useStore();
    if (!user) {
        return <Navigate to="/login" replace />;
    }
    return <>{children}</>;
};

function App() {
    const { isDarkMode } = useStore();

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
            document.documentElement.classList.add('light');
        }
    }, [isDarkMode]);

    return (
        <Router>
            <Routes>
                {/* Public Marketing Route */}
                <Route path="/" element={<Home />} />
                
                {/* Auth Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Secure App / Dashboard Routes */}
                <Route path="/app" element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
                    <Route index element={<Dashboard />} />
                    <Route path="image-generator" element={<ImageGenerator />} />
                    <Route path="video-generator" element={<VideoGenerator />} />
                    <Route path="chatbot" element={<Chatbot />} />
                    <Route path="bg-remover" element={<BgRemover />} />
                    <Route path="text-to-speech" element={<TextToSpeech />} />
                    <Route path="speech-to-text" element={<SpeechToText />} />
                    <Route path="youtube-transcriber" element={<YoutubeTranscriber />} />
                    <Route path="currency-converter" element={<CurrencyConverter />} />

                    {/* Media Studio */}
                    <Route path="image-compressor" element={<ImageCompressor />} />
                    <Route path="image-resizer" element={<ImageResizer />} />
                    <Route path="image-cropper" element={<ImageCropper />} />
                    <Route path="format-converter" element={<FormatConverter />} />
                    <Route path="image-upscaler" element={<ImageUpscaler />} />
                    <Route path="video-to-gif" element={<VideoToGif />} />
                    <Route path="gif-to-video" element={<GifToVideo />} />
                    <Route path="screen-recorder" element={<ScreenRecorder />} />
                    <Route path="webcam-recorder" element={<WebcamRecorder />} />

                    {/* Document Workshop */}
                    <Route path="pdf-to-word" element={<PdfToWord />} />
                    <Route path="word-to-pdf" element={<WordToPdf />} />
                    <Route path="pdf-merger" element={<PdfMerger />} />
                    <Route path="pdf-splitter" element={<PdfSplitter />} />
                    <Route path="pdf-compressor" element={<PdfCompressor />} />
                    <Route path="image-to-pdf" element={<ImageToPdf />} />
                    <Route path="pdf-to-images" element={<PdfToImages />} />

                    {/* Data Tools */}
                    <Route path="json-formatter" element={<JsonFormatter />} />
                    <Route path="json-to-csv" element={<JsonToCsv />} />
                    <Route path="csv-to-json" element={<CsvToJson />} />
                    <Route path="qr-generator" element={<QrGenerator />} />
                    <Route path="csv-visualizer" element={<CsvVisualizer />} />
                    <Route path="qr-scanner" element={<QrScanner />} />
                    <Route path="color-extractor" element={<ColorExtractor />} />
                    <Route path="data-comparator" element={<DataComparator />} />
                    <Route path="web-scraper" element={<WebScraper />} />

                    {/* Utility Hub */}
                    <Route path="password-generator" element={<PasswordGenerator />} />
                    <Route path="password-strength" element={<PasswordStrength />} />
                    <Route path="unit-converter" element={<UnitConverter />} />
                    <Route path="age-calculator" element={<AgeCalculator />} />
                    <Route path="word-counter" element={<WordCounter />} />
                    <Route path="lorem-ipsum" element={<LoremGenerator />} />
                    <Route path="world-clock" element={<WorldClock />} />
                    <Route path="bmi-calculator" element={<BmiCalculator />} />

                    {/* Developer Tools */}
                    <Route path="base64" element={<Base64Encoder />} />
                    <Route path="hash-generator" element={<HashGenerator />} />
                    <Route path="jwt-debugger" element={<JwtDebugger />} />
                    <Route path="regex-tester" element={<RegexTester />} />
                    <Route path="html-formatter" element={<HtmlFormatter />} />
                    <Route path="css-minifier" element={<CssMinifier />} />
                    <Route path="js-minifier" element={<JsMinifier />} />
                    <Route path="api-tester" element={<ApiTester />} />
                    <Route path="sql-formatter" element={<SqlFormatter />} />

                    <Route path="*" element={<GenericTool />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
