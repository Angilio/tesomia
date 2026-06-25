<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Liste des attributions</title>

    <style>
        @page {
            margin: 25px 25px 35px 25px;
        }

        body {
            font-family: DejaVu Sans, sans-serif;
            font-size: 11px;
            color: #111827;
        }

        .header {
            text-align: center;
            border-bottom: 3px solid #2563eb;
            padding-bottom: 12px;
            margin-bottom: 18px;
        }

        .header h1 {
            margin: 0;
            font-size: 22px;
            color: #1e3a8a;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        .header p {
            margin: 5px 0 0;
            color: #6b7280;
            font-size: 11px;
        }

        .summary {
            margin-bottom: 14px;
            padding: 10px;
            background: #eff6ff;
            border: 1px solid #bfdbfe;
            border-radius: 6px;
        }

        .summary strong {
            color: #1e40af;
        }

        .logement-title {
            margin-top: 14px;
            margin-bottom: 6px;
            padding: 7px 10px;
            background: #1e40af;
            color: white;
            font-weight: bold;
            border-radius: 4px;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 8px;
        }

        thead {
            background: #f3f4f6;
        }

        th {
            padding: 8px 6px;
            border: 1px solid #d1d5db;
            font-size: 10px;
            text-transform: uppercase;
            color: #374151;
        }

        td {
            padding: 7px 6px;
            border: 1px solid #d1d5db;
            vertical-align: top;
        }

        tbody tr:nth-child(even) {
            background: #f9fafb;
        }

        .text-center {
            text-align: center;
        }

        .muted {
            color: #6b7280;
        }

        .badge {
            display: inline-block;
            padding: 3px 7px;
            border-radius: 999px;
            background: #e0f2fe;
            color: #075985;
            font-size: 10px;
            font-weight: bold;
        }

        .footer {
            position: fixed;
            bottom: -18px;
            left: 0;
            right: 0;
            text-align: center;
            font-size: 9px;
            color: #6b7280;
            border-top: 1px solid #d1d5db;
            padding-top: 6px;
        }
    </style>
</head>
<body>

    <div class="header">
        <h1>Liste des attributions de logements</h1>
        <p>Document généré le {{ $dateExport }}</p>
    </div>

    <div class="summary">
        <strong>Total des attributions :</strong> {{ $total }}
    </div>

    @forelse($attributions->groupBy(function ($attr) {
        return optional($attr->logement)->name ?? 'Logement non attribué';
    }) as $logementName => $items)

        <div class="logement-title">
            Logement : {{ $logementName }} — {{ $items->count() }} attribution(s)
        </div>

        <table>
            <thead>
                <tr>
                    <th style="width: 5%;">N°</th>
                    <th style="width: 28%;">Utilisateur</th>
                    <th style="width: 18%;">Date début</th>
                    <th style="width: 18%;">Date fin</th>
                </tr>
            </thead>

            <tbody>
                @foreach($items as $index => $attr)
                    <tr>
                        <td class="text-center">{{ $index + 1 }}</td>

                        <td>
                            <strong>{{ optional($attr->user)->name ?? '-' }}</strong>
                        </td>

                        {{-- <td>
                            @if($attr->user && $attr->user->roles && $attr->user->roles->count() > 0)
                                <span class="badge">
                                    {{ $attr->user->roles->pluck('name')->join(', ') }}
                                </span>
                            @else
                                <span class="muted">-</span>
                            @endif
                        </td> --}}

                        <td class="text-center">
                            {{ $attr->date_debut ? \Carbon\Carbon::parse($attr->date_debut)->format('d/m/Y') : '-' }}
                        </td>

                        <td class="text-center">
                            {{ $attr->date_fin ? \Carbon\Carbon::parse($attr->date_fin)->format('d/m/Y') : 'Non définie' }}
                        </td>
                    </tr>
                @endforeach
            </tbody>
        </table>

    @empty
        <table>
            <tbody>
                <tr>
                    <td class="text-center">Aucune attribution trouvée.</td>
                </tr>
            </tbody>
        </table>
    @endforelse

    <div class="footer">
        TESOMIA — Rapport des attributions de logements
    </div>

</body>
</html>