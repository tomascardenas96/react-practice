import { Link } from "react-router-dom";
import CategoryCard from "./CategoryCard";
import Spinner from "./Spinner";
import "./styles/Categories.css";

import React, { useEffect, useState } from "react";

function Categories() {
  const [categories, setCategories] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      fetch("http://localhost:3070/api/v1/category")
        .then((response) => {
          if (!response.ok) {
            setError(true);
          }
          return response.json();
        })
        .then((data) => {
          setCategories(data);
          setLoading(false);
        });
    } catch (error) {
      setError(true);
    }
  }, []);

  if (loading) {
    return <Spinner />;
  }

  const categoryIcons = [
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="1em"
      fill="currentColor"
      viewBox="0 0 514 514"
    >
      <path d="M 271 33 Q 248 57 260 103 Q 272 150 317 197 Q 364 242 411 254 Q 457 266 481 243 Q 495 228 496 203 Q 496 186 492 171 Q 489 163 486 155 Q 471 116 435 79 Q 398 43 360 28 Q 351 25 343 22 Q 327 18 310 18 Q 285 19 271 33 L 271 33 Z M 407 270 Q 355 256 306 208 Q 258 159 244 107 Q 235 71 246 42 L 245 43 L 198 90 Q 145 145 144 220 L 144 298 Q 145 329 165 349 Q 185 369 216 370 L 294 370 Q 369 369 424 316 L 471 269 L 471 269 Q 472 268 472 268 Q 472 268 472 268 Q 443 279 407 270 L 407 270 Z M 447 67 Q 484 105 501 150 Q 505 159 508 169 Q 512 186 512 203 Q 514 245 483 280 L 483 280 L 435 328 Q 376 385 294 386 L 216 386 Q 206 386 197 384 Q 197 384 196 385 L 182 400 Q 176 405 182 415 Q 192 431 192 450 Q 191 477 173 495 Q 155 513 128 514 Q 101 513 83 495 Q 65 477 64 450 Q 37 449 19 431 Q 1 413 0 386 Q 1 359 19 341 Q 37 323 64 322 Q 83 322 99 332 Q 109 338 114 332 L 129 318 Q 130 317 130 317 Q 128 308 128 298 L 128 220 Q 129 138 187 79 L 234 31 Q 269 0 310 2 Q 327 2 346 6 Q 356 9 366 13 Q 410 30 447 67 L 447 67 Z M 136 334 L 126 344 Q 118 351 108 351 Q 98 351 90 346 Q 79 338 64 338 Q 44 339 30 352 Q 17 366 16 386 Q 17 406 30 420 Q 44 433 64 434 Q 79 435 80 450 Q 81 470 94 484 Q 108 497 128 498 Q 148 497 162 484 Q 175 470 176 450 Q 176 435 168 424 Q 163 416 163 406 Q 163 397 170 389 L 180 379 Q 150 364 136 334 L 136 334 Z M 354 116 Q 351 118 353 128 Q 355 138 366 148 Q 376 159 386 161 Q 396 163 398 160 Q 401 158 399 148 Q 397 138 386 128 Q 376 117 366 115 Q 356 113 354 116 L 354 116 Z M 398 116 Q 411 129 415 144 Q 419 159 409 171 Q 397 181 382 177 Q 367 173 354 160 Q 341 147 337 132 Q 333 117 343 105 Q 355 95 370 99 Q 385 103 398 116 L 398 116 Z" />
    </svg>,
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="1em"
      fill="currentColor"
      viewBox="0 0 480 448"
    >
      <path d="M 435 176 L 45 176 Q 33 175 32 163 Q 32 162 32 161 Q 34 153 43 131 Q 53 108 76 82 Q 98 55 138 36 Q 177 17 240 16 Q 302 17 342 36 Q 382 55 404 82 Q 427 108 437 131 Q 447 153 448 161 Q 448 162 448 163 Q 447 175 435 176 L 435 176 Z M 45 192 L 435 192 Q 447 192 455 183 Q 464 175 464 163 Q 464 160 463 157 Q 462 144 443 107 Q 423 70 375 36 Q 328 2 240 0 Q 152 2 105 36 Q 57 70 37 107 Q 18 144 17 157 Q 16 160 16 163 Q 16 175 25 183 Q 33 192 45 192 L 45 192 Z M 43 368 L 437 368 Q 447 369 448 379 Q 447 402 433 417 Q 418 431 395 432 L 85 432 Q 62 431 47 417 Q 33 402 32 379 Q 33 369 43 368 L 43 368 Z M 43 352 Q 32 352 24 360 L 24 360 Q 16 368 16 379 Q 17 409 36 428 Q 55 447 85 448 L 395 448 Q 425 447 444 428 Q 463 409 464 379 Q 464 368 456 360 Q 448 352 437 352 L 43 352 L 43 352 Z M 128 112 Q 143 111 144 96 Q 143 81 128 80 Q 113 81 112 96 Q 113 111 128 112 L 128 112 Z M 368 96 Q 367 81 352 80 Q 337 81 336 96 Q 337 111 352 112 Q 367 111 368 96 L 368 96 Z M 240 80 Q 255 79 256 64 Q 255 49 240 48 Q 225 49 224 64 Q 225 79 240 80 L 240 80 Z M 286 295 Q 304 306 322 295 L 399 244 Q 405 240 412 240 L 416 240 L 432 240 Q 446 240 455 249 Q 464 258 464 272 Q 464 286 455 295 Q 446 304 432 304 L 354 304 L 330 320 L 432 320 Q 452 319 466 306 Q 479 292 480 272 Q 479 252 466 238 Q 452 225 432 224 L 416 224 L 412 224 L 196 224 L 192 224 L 176 224 L 48 224 Q 28 225 14 238 Q 1 252 0 272 Q 1 292 14 306 Q 28 319 48 320 L 278 320 L 254 304 L 48 304 Q 34 304 25 295 Q 16 286 16 272 Q 16 258 25 249 Q 34 240 48 240 L 176 240 L 192 240 L 196 240 Q 203 240 209 244 L 286 295 L 286 295 Z M 376 240 L 313 282 Q 304 288 295 282 L 232 240 L 376 240 L 376 240 Z" />
    </svg>,
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="1em"
      fill="currentColor"
      viewBox="0 0 512 512"
    >
      <path d="M 475 139 L 139 475 Q 117 496 88 496 Q 59 496 37 475 Q 16 453 16 424 Q 16 395 37 373 L 373 37 Q 395 16 424 16 Q 453 16 475 37 Q 496 59 496 88 Q 496 117 475 139 L 475 139 Z M 486 150 Q 512 123 512 88 L 512 88 Q 512 53 486 26 Q 459 0 424 0 Q 389 0 362 26 L 26 362 Q 0 389 0 424 Q 0 459 26 486 Q 53 512 88 512 Q 123 512 150 486 L 486 150 L 486 150 Z M 406 122 Q 400 118 394 122 Q 383 133 375 137 Q 368 141 360 142 L 359 142 Q 358 143 358 143 Q 351 144 343 148 Q 333 152 322 162 Q 303 184 300 202 L 300 202 Q 298 217 282 234 Q 273 243 267 245 Q 262 247 255 248 L 255 248 Q 248 249 238 252 Q 229 256 218 266 Q 199 288 196 306 L 196 306 Q 194 321 178 338 Q 169 347 163 350 Q 156 352 149 354 L 149 354 L 148 354 Q 140 356 129 361 Q 119 366 106 378 Q 102 384 106 390 Q 112 394 118 390 Q 129 379 137 375 Q 144 371 152 370 L 153 369 Q 154 369 154 369 Q 161 368 169 364 Q 179 360 190 350 Q 209 328 212 310 L 212 310 Q 214 295 230 278 Q 239 269 245 267 Q 250 265 257 264 L 257 264 Q 258 264 258 264 Q 265 263 274 260 Q 283 256 294 246 Q 313 224 316 206 L 316 206 Q 318 191 334 174 Q 343 165 349 162 Q 355 160 363 158 L 364 158 Q 372 156 383 151 Q 393 146 406 134 Q 410 128 406 122 L 406 122 Z M 305 17 Q 288 0 264 0 Q 240 0 223 17 L 17 223 Q 0 240 0 264 Q 0 288 17 305 L 24 312 L 36 301 L 28 294 Q 16 281 16 264 Q 16 247 28 234 L 17 223 L 28 234 L 234 28 Q 247 16 264 16 Q 281 16 294 28 L 301 36 L 312 24 L 305 17 L 305 17 Z M 200 488 L 207 495 Q 224 512 248 512 Q 272 512 289 495 L 495 289 Q 512 272 512 248 Q 512 224 495 207 L 488 200 L 476 211 L 484 218 Q 496 231 496 248 Q 496 265 484 278 L 278 484 Q 265 496 248 496 Q 231 496 218 484 L 211 476 L 200 488 L 200 488 Z" />
    </svg>,
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="1em"
      fill="currentColor"
      viewBox="0 0 384 512"
    >
      <path d="M 249 0 Q 219 2 210 30 L 186 128 L 8 128 Q 1 129 0 136 Q 1 143 8 144 L 192 144 Q 192 144 192 144 Q 192 144 192 144 L 376 144 Q 383 143 384 136 Q 383 129 376 128 L 202 128 L 226 34 Q 231 17 249 16 L 280 16 Q 287 15 288 8 Q 287 1 280 0 L 249 0 L 249 0 Z M 36 176 L 60 468 Q 62 487 76 499 Q 89 512 108 512 L 276 512 Q 295 512 308 499 Q 322 487 324 468 L 348 176 L 332 176 L 308 467 Q 303 494 276 496 L 108 496 Q 95 496 87 488 Q 78 479 76 467 L 52 176 L 36 176 L 36 176 Z" />
    </svg>,
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="1em"
      fill="currentColor"
      viewBox="0 0 448 512"
    >
      <path d="M 232 0 Q 227 0 225 4 Q 223 8 225 12 L 236 29 Q 240 34 240 41 Q 238 62 217 64 L 144 64 Q 117 65 99 83 Q 81 101 80 128 Q 80 141 85 152 L 76 152 Q 44 153 22 174 Q 1 196 0 228 Q 1 260 22 282 Q 44 303 76 304 L 372 304 Q 404 303 426 282 Q 447 260 448 228 Q 447 196 426 174 Q 404 153 372 152 L 360 152 Q 368 137 368 118 Q 367 68 333 35 Q 300 1 250 0 L 232 0 L 232 0 Z M 250 20 L 247 16 L 250 16 Q 293 17 322 46 Q 351 75 352 118 Q 352 137 341 152 L 264 152 Q 257 153 256 160 Q 257 167 264 168 L 345 168 L 352 168 L 372 168 Q 397 169 414 186 Q 431 203 432 228 Q 431 253 414 270 Q 397 287 372 288 L 76 288 Q 51 287 34 270 Q 17 253 16 228 Q 17 203 34 186 Q 51 169 76 168 L 96 168 L 98 168 L 136 168 Q 143 167 144 160 Q 143 153 136 152 L 102 152 Q 96 141 96 128 Q 97 108 110 94 Q 124 81 144 80 L 217 80 Q 234 80 245 69 Q 256 58 256 41 Q 256 30 250 20 L 250 20 Z M 32 336 Q 31 329 24 328 Q 17 329 16 336 L 16 352 Q 17 393 44 420 Q 71 447 112 448 L 155 448 L 129 500 Q 127 504 129 508 Q 132 512 136 512 L 312 512 Q 316 512 319 508 Q 321 504 319 500 L 293 448 L 336 448 Q 377 447 404 420 Q 431 393 432 352 L 432 336 Q 431 329 424 328 Q 417 329 416 336 L 416 352 Q 415 386 393 409 Q 370 431 336 432 L 280 432 Q 276 432 273 436 Q 271 440 273 444 L 299 496 L 149 496 L 175 444 Q 177 440 175 436 Q 172 432 168 432 L 112 432 Q 78 431 55 409 Q 33 386 32 352 L 32 336 L 32 336 Z" />
    </svg>,
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="1em"
      fill="currentColor"
      viewBox="0 0 496 512"
    >
      <path d="M 192 0 Q 236 1 261 34 Q 262 34 263 34 Q 264 34 265 34 Q 284 17 312 16 Q 343 17 363 37 Q 383 57 384 88 Q 383 119 363 139 Q 343 159 312 160 Q 284 159 265 142 Q 264 142 263 142 Q 262 142 261 142 Q 236 175 192 176 Q 148 175 123 142 Q 122 142 121 142 Q 120 142 119 142 Q 100 159 72 160 Q 41 159 21 139 Q 1 119 0 88 Q 1 57 21 37 Q 41 17 72 16 Q 100 17 120 34 Q 120 34 121 34 Q 123 34 123 34 Q 148 1 192 0 L 192 0 Z M 135 44 Q 123 56 109 46 Q 94 32 72 32 Q 48 33 32 48 Q 17 64 16 88 Q 17 112 32 128 Q 48 143 72 144 Q 94 144 109 130 Q 123 120 135 132 Q 156 159 192 160 Q 228 159 249 132 Q 261 120 275 130 Q 290 144 312 144 Q 336 143 352 128 Q 367 112 368 88 Q 367 64 352 48 Q 336 33 312 32 Q 290 32 275 46 Q 261 56 249 44 Q 228 17 192 16 Q 156 17 135 44 L 135 44 Z M 352 448 L 352 432 L 352 432 L 352 184 L 352 184 Q 353 177 360 176 L 367 176 L 368 176 L 368 176 L 440 176 Q 464 177 480 192 Q 495 208 496 232 L 496 334 Q 496 356 484 374 Q 473 391 453 400 L 368 437 L 368 448 Q 367 475 349 493 Q 331 511 304 512 L 80 512 Q 53 511 35 493 Q 17 475 16 448 L 16 176 Q 24 181 32 184 L 32 448 Q 33 468 46 482 Q 60 495 80 496 L 304 496 Q 324 495 338 482 Q 351 468 352 448 L 352 448 Z M 446 385 Q 478 370 480 334 L 480 232 Q 480 215 468 204 Q 457 192 440 192 L 368 192 L 368 420 L 446 386 L 446 385 Z M 128 232 L 128 440 Q 127 447 120 448 Q 113 447 112 440 L 112 232 Q 113 225 120 224 Q 127 225 128 232 L 128 232 Z M 200 232 L 200 440 Q 199 447 192 448 Q 185 447 184 440 L 184 232 Q 185 225 192 224 Q 199 225 200 232 L 200 232 Z M 272 232 L 272 440 Q 271 447 264 448 Q 257 447 256 440 L 256 232 Q 257 225 264 224 Q 271 225 272 232 L 272 232 Z" />
    </svg>,
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="1em"
      fill="currentColor"
      viewBox="0 0 385 507"
    >
      <path d="M 172 19 Q 163 17 161 27 L 161 265 Q 152 263 145 261 L 145 27 Q 146 13 156 7 Q 165 0 178 4 L 226 24 Q 240 30 241 46 L 241 261 Q 234 263 225 265 L 225 46 Q 225 41 220 38 L 172 19 L 172 19 Z M 75 53 L 101 217 Q 95 204 82 195 L 59 56 Q 57 39 72 31 L 113 10 L 113 28 L 79 45 Q 74 48 75 53 L 75 53 Z M 17 89 L 36 187 L 22 187 Q 21 187 20 187 L 1 93 Q 0 85 8 83 Q 15 82 17 90 L 17 89 Z M 385 93 L 366 187 Q 365 187 365 187 Q 364 187 364 187 L 350 187 L 369 89 Q 371 82 379 83 Q 385 85 385 92 L 385 93 Z M 332 76 L 307 193 Q 293 201 286 214 L 316 73 Q 316 63 307 64 L 273 70 L 273 54 L 304 48 Q 317 46 325 55 Q 334 63 332 76 L 332 76 Z M 75 479 Q 78 490 90 491 L 296 491 Q 308 490 311 479 L 369 242 Q 369 241 369 240 Q 369 236 364 235 L 331 235 L 331 235 Q 331 235 331 235 Q 331 235 330 235 Q 330 235 329 236 Q 328 238 327 240 L 311 237 L 327 240 Q 323 265 293 290 Q 262 314 193 315 Q 124 314 93 290 Q 63 264 59 240 Q 58 238 57 236 Q 56 235 55 235 Q 55 235 55 235 L 55 235 L 22 235 Q 17 236 17 241 Q 17 241 17 242 L 75 479 L 75 479 Z M 59 483 L 2 246 Q 1 243 1 240 Q 3 221 22 219 L 55 219 Q 70 221 75 237 Q 78 256 103 277 Q 128 297 193 299 Q 258 297 283 277 Q 308 256 311 237 Q 316 221 331 219 L 364 219 Q 383 221 385 240 Q 385 243 384 246 L 327 483 Q 320 506 296 507 L 90 507 Q 66 506 59 483 L 59 483 Z" />
    </svg>,
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="1em"
      fill="currentColor"
      viewBox="0 0 514 513"
    >
      <path d="M 507 17 Q 514 15 513 7 Q 511 0 503 1 L 193 66 L 193 83 L 507 17 L 507 17 Z M 193 141 L 193 157 L 506 137 Q 513 136 513 129 Q 512 121 505 121 L 193 141 L 193 141 Z M 161 225 L 161 225 L 161 33 Q 160 26 153 25 Q 146 26 145 33 L 145 76 L 145 76 L 145 93 L 145 93 L 145 144 L 145 144 L 145 160 L 145 160 L 145 225 L 113 225 L 113 225 L 113 225 L 113 49 Q 112 42 105 41 Q 98 42 97 49 L 97 86 L 7 105 Q 0 107 1 115 Q 3 122 11 121 L 97 103 L 97 147 L 9 153 Q 1 154 1 162 Q 2 169 10 169 L 97 163 L 97 225 L 35 225 Q 21 225 12 235 Q 3 245 3 259 L 5 286 Q 9 349 43 399 Q 76 448 130 474 Q 133 491 146 502 Q 159 513 177 513 L 337 513 Q 355 513 368 502 Q 381 491 384 474 Q 438 448 471 399 Q 505 349 509 286 L 511 259 Q 511 245 502 235 Q 493 225 479 225 L 161 225 L 161 225 L 161 225 Z M 146 471 Q 144 464 137 460 Q 87 435 56 390 Q 25 344 21 285 L 19 258 Q 20 243 35 241 L 479 241 Q 494 243 495 258 L 494 285 Q 489 344 458 390 Q 427 435 377 460 Q 370 464 368 471 Q 362 495 337 497 L 177 497 Q 152 495 146 471 L 146 471 Z" />
    </svg>,
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="1em"
      fill="currentColor"
      viewBox="0 0 576 512"
    >
      <path d="M 256 279 Q 247 269 247 256 L 247 256 Q 247 243 256 233 L 369 121 Q 322 81 256 80 Q 181 82 132 132 Q 82 181 80 256 Q 82 331 132 380 Q 181 430 256 432 Q 322 431 369 391 L 256 279 L 256 279 Z M 267 267 L 381 381 L 392 392 L 426 426 Q 435 437 425 448 Q 356 510 256 512 Q 184 511 127 477 Q 69 443 35 385 Q 1 328 0 256 Q 1 184 35 127 Q 69 69 127 35 Q 184 1 256 0 Q 355 2 425 64 Q 435 75 426 86 L 392 120 L 381 132 L 267 245 Q 258 256 267 267 L 267 267 Z M 414 437 L 380 403 Q 328 447 256 448 Q 174 446 120 392 Q 66 338 64 256 Q 66 174 120 120 Q 174 66 256 64 Q 328 65 380 109 L 414 75 Q 349 18 256 16 Q 189 17 135 49 Q 81 81 49 135 Q 17 189 16 256 Q 17 323 49 377 Q 81 431 135 463 Q 189 495 256 496 Q 349 494 414 437 L 414 437 Z M 560 256 Q 558 163 501 98 L 467 132 Q 511 184 512 256 Q 511 328 467 380 L 501 414 Q 558 349 560 256 L 560 256 Z M 455 143 L 343 256 L 455 369 Q 495 322 496 256 Q 495 190 455 143 L 455 143 Z M 490 426 L 456 392 L 445 381 L 331 267 Q 322 256 331 245 L 490 86 Q 501 77 512 87 Q 574 156 576 256 Q 574 356 512 425 Q 501 435 490 426 L 490 426 Z M 144 256 Q 145 241 160 240 Q 175 241 176 256 Q 175 271 160 272 Q 145 271 144 256 L 144 256 Z M 224 144 Q 239 145 240 160 Q 239 175 224 176 Q 209 175 208 160 Q 209 145 224 144 L 224 144 Z M 208 352 Q 209 337 224 336 Q 239 337 240 352 Q 239 367 224 368 Q 209 367 208 352 L 208 352 Z M 448 240 Q 463 241 464 256 Q 463 271 448 272 Q 433 271 432 256 Q 433 241 448 240 L 448 240 Z" />
    </svg>,
  ];

  return (
    <main className="categories-food__container">
      <section>
        <h1>Categorias</h1>
        <div>
          {categories.map((categ, index) => (
            <Link key={index} to={`/category/${(categ.description).toLowerCase()}`}>
              <CategoryCard
                className="unit-category"
                icon={categoryIcons[index]}
                categoryName={categ.description}
              />
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Categories;
