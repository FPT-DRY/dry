import { NextResponse } from 'next/server';

export type SearchParams = {
  [key: string]: string | string[] | undefined;
};

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

type HttpClientErrorStatus =
  | 400
  | 401
  | 402
  | 403
  | 404
  | 405
  | 406
  | 407
  | 408
  | 409
  | 410
  | 411
  | 412
  | 413
  | 414
  | 415
  | 416
  | 417
  | 418
  | 419
  | 420
  | 421
  | 422
  | 423
  | 424
  | 425
  | 426
  | 427
  | 428
  | 429
  | 430
  | 431
  | 432
  | 433
  | 434
  | 435
  | 436
  | 437
  | 438
  | 439
  | 440
  | 441
  | 442
  | 443
  | 444
  | 445
  | 446
  | 447
  | 448
  | 449
  | 450
  | 451
  | 452
  | 453
  | 454
  | 455
  | 456
  | 457
  | 458
  | 459
  | 460
  | 461
  | 462
  | 463
  | 464
  | 465
  | 466
  | 467
  | 468
  | 469
  | 470
  | 471
  | 472
  | 473
  | 474
  | 475
  | 476
  | 477
  | 478
  | 479
  | 480
  | 481
  | 482
  | 483
  | 484
  | 485
  | 486
  | 487
  | 488
  | 489
  | 490
  | 491
  | 492
  | 493
  | 494
  | 495
  | 496
  | 497
  | 498
  | 499;

type HttpServerErrorStatus =
  | 500
  | 501
  | 502
  | 503
  | 504
  | 505
  | 506
  | 507
  | 508
  | 509
  | 510
  | 511
  | 512
  | 513
  | 514
  | 515
  | 516
  | 517
  | 518
  | 519
  | 520
  | 521
  | 522
  | 523
  | 524
  | 525
  | 526
  | 527
  | 528
  | 529
  | 530
  | 531
  | 532
  | 533
  | 534
  | 535
  | 536
  | 537
  | 538
  | 539
  | 540
  | 541
  | 542
  | 543
  | 544
  | 545
  | 546
  | 547
  | 548
  | 549
  | 550
  | 551
  | 552
  | 553
  | 554
  | 555
  | 556
  | 557
  | 558
  | 559
  | 560
  | 561
  | 562
  | 563
  | 564
  | 565
  | 566
  | 567
  | 568
  | 569
  | 570
  | 571
  | 572
  | 573
  | 574
  | 575
  | 576
  | 577
  | 578
  | 579
  | 580
  | 581
  | 582
  | 583
  | 584
  | 585
  | 586
  | 587
  | 588
  | 589
  | 590
  | 591
  | 592
  | 593
  | 594
  | 595
  | 596
  | 597
  | 598
  | 599;

export type NextParams<T> = {
  params: T;
};

class HttpError {
  status: number;
  name: string;
  message?: string;
  cause?: string | string[] | object;

  constructor(
    name: string,
    status: number,
    messages?: string,
    cause?: string | string[] | object
  ) {
    this.name = name;
    this.status = status;
    this.message = messages;
    this.cause = cause;
  }
}

export class HttpClientError extends HttpError {
  private constructor(
    name: string,
    status: HttpClientErrorStatus,
    message?: string,
    cause?: string | string[] | object
  ) {
    super(name, Number(status), message, cause);
  }

  static create({
    name,
    status,
    message,
    cause,
  }: {
    name: string;
    status: HttpClientErrorStatus;
    message?: string;
    cause?: string | string[] | object;
  }): HttpClientError {
    return new HttpClientError(name, status, message, cause);
  }

  static badClient(message?: string, cause?: string | string[] | object) {
    return new HttpClientError('Bad Client', 400, message, cause);
  }

  static json(error?: HttpClientError) {
    error = error || this.badClient();
    const response = { error };

    return NextResponse.json(response, { status: error?.status });
  }
}

export class HttpServerError extends HttpError {
  private constructor(
    name: string,
    status: HttpServerErrorStatus,
    message?: string,
    cause?: string | string[] | object
  ) {
    super(name, Number(status), message, cause);
  }

  static create({
    name,
    status,
    message,
    cause,
  }: {
    name: string;
    status: HttpServerErrorStatus;
    message?: string;
    cause?: string | string[] | object;
  }) {
    return new HttpServerError(name, status, message, cause);
  }

  static internalServerError(
    message?: string,
    cause?: string | string[] | object
  ) {
    return new HttpServerError('Internal Server Error', 500, message, cause);
  }

  static json(error?: HttpServerError) {
    error = error || this.internalServerError();
    const response = { error };

    return NextResponse.json(response, { status: error?.status });
  }
}
