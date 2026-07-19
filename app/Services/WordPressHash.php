<?php

namespace App\Services;

class WordPressHash
{
    public static function check(string $password, string $hash): bool
    {
        if (strlen($hash) !== 34) {
            return false;
        }

        $itoa64 = './0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        $count_log2 = strpos($itoa64, $hash[3]);

        if ($count_log2 < 7 || $count_log2 > 30) {
            return false;
        }

        $count = 1 << $count_log2;
        $salt = substr($hash, 4, 8);

        if (strlen($salt) !== 8) {
            return false;
        }

        $hash_input = md5($salt . $password, true);

        do {
            $hash_input = md5($hash_input . $password, true);
        } while (--$count);

        $output = substr($hash, 0, 12);
        $output .= self::encode64($hash_input, 16);

        return hash_equals($hash, $output);
    }

    public static function make(string $password): string
    {
        $itoa64 = './0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        $salt = '';

        for ($i = 0; $i < 8; $i++) {
            $salt .= $itoa64[random_int(0, 63)];
        }

        $count = 1 << 13;
        $hash = md5($salt . $password, true);

        do {
            $hash = md5($hash . $password, true);
        } while (--$count);

        return '$P$B' . $itoa64[13] . $salt . self::encode64($hash, 16);
    }

    private static function encode64(string $input, int $count): string
    {
        $itoa64 = './0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        $output = '';
        $i = 0;

        do {
            $value = ord($input[$i++]);
            $output .= $itoa64[$value & 0x3f];

            if ($i < $count) {
                $value |= ord($input[$i]) << 8;
            }

            $output .= $itoa64[($value >> 6) & 0x3f];

            if ($i++ >= $count) {
                break;
            }

            if ($i < $count) {
                $value |= ord($input[$i]) << 16;
            }

            $output .= $itoa64[($value >> 12) & 0x3f];

            if ($i++ >= $count) {
                break;
            }

            $output .= $itoa64[($value >> 18) & 0x3f];
        } while ($i < $count);

        return $output;
    }
}
