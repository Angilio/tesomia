<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="utf-8">
    <title>Rapport des Droits Annuels</title>

    <style>
        @page {
            margin: 25px 25px 45px 25px;
        }

        body {
            font-family: DejaVu Sans, sans-serif;
            font-size: 12px;
            color: #111827;
        }

        .header {
            text-align: center;
            border-bottom: 2px solid #16a34a;
            padding-bottom: 12px;
            margin-bottom: 18px;
        }

        .header h2 {
            margin: 0;
            font-size: 22px;
            color: #166534;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        .header p {
            margin: 6px 0 0;
            font-size: 11px;
            color: #6b7280;
        }

        .summary {
            margin-bottom: 15px;
            padding: 10px;
            background-color: #f0fdf4;
            border: 1px solid #bbf7d0;
            border-radius: 6px;
        }

        .summary strong {
            color: #166534;
        }

        .filter-label {
            display: inline-block;
            margin-top: 5px;
            padding: 4px 8px;
            border-radius: 10px;
            background-color: #dcfce7;
            color: #166534;
            font-size: 10px;
            font-weight: bold;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            table-layout: fixed;
        }

        thead {
            display: table-header-group;
        }

        tr {
            page-break-inside: avoid;
        }

        th {
            background-color: #16a34a;
            color: #ffffff;
            padding: 8px 6px;
            border: 1px solid #15803d;
            text-transform: uppercase;
            font-size: 11px;
        }

        td {
            border: 1px solid #d1d5db;
            padding: 7px 6px;
            vertical-align: middle;
            word-wrap: break-word;
        }

        .logement-cell {
            background-color: #f0fdf4;
            color: #166534;
            font-weight: bold;
            text-align: center;
            vertical-align: middle;
        }

        .logement-non-attribue {
            background-color: #fef2f2;
            color: #991b1b;
        }

        .member-name {
            font-weight: bold;
            color: #111827;
        }

        .member-subtitle {
            margin-top: 2px;
            font-size: 10px;
            color: #6b7280;
        }

        .text-center {
            text-align: center;
        }

        .paye {
            display: inline-block;
            padding: 4px 8px;
            border-radius: 12px;
            background-color: #dcfce7;
            color: #166534;
            font-weight: bold;
            font-size: 10px;
        }

        .non-paye {
            display: inline-block;
            padding: 4px 8px;
            border-radius: 12px;
            background-color: #fee2e2;
            color: #991b1b;
            font-weight: bold;
            font-size: 10px;
        }

        .empty {
            text-align: center;
            padding: 18px;
            color: #6b7280;
            font-style: italic;
        }

        .footer {
            position: fixed;
            bottom: -25px;
            left: 0;
            right: 0;
            text-align: center;
            font-size: 10px;
            color: #6b7280;
            border-top: 1px solid #e5e7eb;
            padding-top: 8px;
        }
    </style>
</head>

<body>

    @php
        /*
            Ce bloc rend le PDF compatible avec deux cas :
            1. Si le contrôleur envoie déjà $groupes.
            2. Si le contrôleur envoie seulement $membres.
        */
        if (!isset($groupes)) {
            $groupes = collect($membres ?? [])
                ->groupBy(function ($membre) {
                    return data_get($membre, 'logement')
                        ?? data_get($membre, 'adresse')
                        ?? 'Non attribué';
                })
                ->map(function ($items, $logement) {
                    return [
                        'logement' => $logement,
                        'membres' => $items->values(),
                    ];
                })
                ->values();
        }

        $totalPayes = collect($membres ?? [])
            ->filter(fn ($membre) => data_get($membre, 'paye') == true)
            ->count();

        $totalNonPayes = collect($membres ?? [])->count() - $totalPayes;

        $filtreLabel = match($filtre ?? 'tous') {
            'actifs' => 'Membres ayant payé',
            'non_actifs' => 'Membres non payés',
            default => 'Tous les membres',
        };
    @endphp

    <div class="header">
        <h2>Rapport des Droits Annuels</h2>
        <p>Document généré le {{ now()->format('d/m/Y à H:i') }}</p>
    </div>

    <div class="summary">
        <strong>Total des membres :</strong> {{ $totalMembres ?? collect($membres ?? [])->count() }}
        &nbsp; | &nbsp;
        <strong>Payés :</strong> {{ $totalPayes }}
        &nbsp; | &nbsp;
        <strong>Non payés :</strong> {{ $totalNonPayes }}

        <br>

        <span class="filter-label">
            Filtre : {{ $filtreLabel }}
        </span>
    </div>

    <table>
        <thead>
            <tr>
                <th style="width: 30%;">Logement</th>
                <th style="width: 45%;">Membres qui y demeurent</th>
                <th style="width: 25%;">Statut paiement</th>
            </tr>
        </thead>

        <tbody>
            @forelse($groupes as $groupe)
                @php
                    $logement = data_get($groupe, 'logement', 'Non attribué');
                    $membresDuLogement = collect(data_get($groupe, 'membres', []));
                    $rowspan = max($membresDuLogement->count(), 1);
                @endphp

                @foreach($membresDuLogement as $membre)
                    <tr>
                        @if($loop->first)
                            <td
                                rowspan="{{ $rowspan }}"
                                class="logement-cell {{ $logement === 'Non attribué' ? 'logement-non-attribue' : '' }}"
                            >
                                {{ $logement }}
                                <br>
                                <small>
                                    {{ $membresDuLogement->count() }} membre(s)
                                </small>
                            </td>
                        @endif

                        <td>
                            <div class="member-name">
                                {{ data_get($membre, 'name', '-') }}
                            </div>

                            <div class="member-subtitle">
                                Membre TESOMIA
                            </div>
                        </td>

                        <td class="text-center">
                            @if(data_get($membre, 'paye') == true)
                                <span class="paye">Payé</span>
                            @else
                                <span class="non-paye">Non payé</span>
                            @endif
                        </td>
                    </tr>
                @endforeach

            @empty
                <tr>
                    <td colspan="3" class="empty">
                        Aucun membre trouvé.
                    </td>
                </tr>
            @endforelse
        </tbody>
    </table>

    <div class="footer">
        Rapport des droits annuels - PDF généré automatiquement
    </div>

</body>
</html>