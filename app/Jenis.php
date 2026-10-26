<?php

namespace App;

enum Jenis : string
{
    case OLI = 'OLI';
    case SERVICE = 'SERVICE';
    case BAN = 'BAN';
    case AKI = 'AKI';
    case PAJAK_1_TAHUN = 'PAJAK 1 TAHUN';
    case PAJAK_5_TAHUN = 'PAJAK_5_TAHUN';
    case KIR = 'KIR';
    case APAR = 'APAR';
    case PROPERTY = 'PROPERTY';
    case ATK = 'ATK';
    case IT = 'IT';
}
